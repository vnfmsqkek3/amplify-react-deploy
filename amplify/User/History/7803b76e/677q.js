import React, { useEffect } from 'react';
import { store, view } from '@risingstack/react-easy-state';
import Widget from './widget.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AWS from 'aws-sdk';
import { Auth, PubSub, API } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Amplify } from "aws-amplify";
import awsExports from "../../aws-exports.js";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const LOCAL_STORAGE_KEY = 'iot-widget';

const state = store({
  iotPolicy: 'amplify-toolkit-iot-message-viewer',
  iotEndpoint: null,
  message_history_limit: 200,
  message_count: 0,
  messages: [],
  subscribeTopicInput: 'iot_event_viewer',
  publishTopicInput: 'iot_event_viewer',
  publishMessage: '{"Hello": "world!"}',
  isSubscribed: false,
  subscribedTopic: '',
  subscription: null,
  iotProviderConfigured: false,
  led_bright: 0,
  led_flashing_speed: 0,
  led_flashing_mode: 0
});

const stateKeysToSave = [
  'subscribeTopicInput',
  'publishTopicInput',
  'publishMessage'
];

const EventViewer = (props) => {
  useEffect(() => {
    async function setup() {
      await getIoTEndpoint();
      await configurePubSub();
      await attachIoTPolicyToUser();
    }
    setup();
    updateFormValuesFromLocalStorage();
  }, []);

  return (
    <Widget>
      <h2>IoT Message Viewer</h2>
      <TextField
        id="subscribeTopicInput"
        label="Subscribed topic"
        value={state.subscribeTopicInput}
        onChange={e => updateState('subscribeTopicInput', e.target.value)}
      />
      <br /><br />
      <Button id="subscribeToTopic" variant="contained" color="primary" onClick={subscribeToTopic}>
        Subscribe to topic
      </Button>
      <br /><br /><br />
      <TextField
        id="publishTopicInput"
        label="Topic to publish to"
        value={state.publishTopicInput}
        onChange={e => updateState('publishTopicInput', e.target.value)}
      />
      <br /><br />
      <TextField
        id="publishMessage"
        label="Message to publish"
        value={state.publishMessage}
        onChange={e => updateState('publishMessage', e.target.value)}
        fullWidth={true}
        multiline={true}
        rowsMax={30}
        size='small'
        variant="outlined"
      />
      <br /><br />
      <Button id="publishMessageBtn" variant="contained" color="primary" onClick={sendMessage}>
        Publish message
      </Button>
      <br /><br />

      <h3>Publish New Message</h3>
      <TextField
        id="led_bright"
        label="LED Brightness"
        type="number"
        value={state.led_bright}
        onChange={e => updateState('led_bright', parseInt(e.target.value))}
      />
      <br /><br />
      <FormControl>
        <InputLabel>LED Flashing Speed</InputLabel>
        <Select
          value={state.led_flashing_speed}
          onChange={e => updateState('led_flashing_speed', e.target.value)}
        >
          {[...Array(10).keys()].map(num => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
      <FormControl>
        <InputLabel>LED Flashing Mode</InputLabel>
        <Select
          value={state.led_flashing_mode}
          onChange={e => updateState('led_flashing_mode', e.target.value)}
        >
          {[...Array(21).keys()].map(num => (
            <MenuItem key={num} value={num}>{num}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
      <Button variant="contained" color="primary" onClick={sendNewMessage}>
        Publish New Message
      </Button>
      <br /><br />

      {state.isSubscribed ?
        <div style={{ color: 'green' }}>Currently subscribed to topic '{state.subscribedTopic}':</div>
        :
        <div style={{ color: 'red' }}>Subscribe to a topic to view messages</div>
      }
      <br /><br />
      {state.isSubscribed ?
        <TextField
          id="eventStream"
          label="received messages"
          value={state.messages.join('')}
          fullWidth={true}
          multiline={true}
          rowsMax={30}
          size='small'
          disabled={true}
          variant="outlined"
        />
        :
        null}
    </Widget>
  );
};
//------------------------------------------------------------------------------
async function getIoTEndpoint() {

  // Each AWS account has a unique IoT endpoint per region. We need to retrieve this value: 
  console.log('Getting IoT Endpoint...');
  const credentials = await Auth.currentCredentials();
  const iot = new AWS.Iot({
    region: awsExports.aws_project_region,
    credentials: Auth.essentialCredentials(credentials)
  });
  const response = await iot.describeEndpoint({endpointType: 'iot:Data-ATS'}).promise();
  state.iotEndpoint = `wss://${response.endpointAddress}/mqtt`
  console.log(`Your IoT Endpoint is:\n ${state.iotEndpoint}`);

}


async function configurePubSub() {

  if (!state.iotProviderConfigured) {
    console.log(`Configuring Amplify PubSub, region = ${awsExports.aws_project_region}, endpoint = ${state.iotEndpoint}`);
    Amplify.addPluggable(new AWSIoTProvider({
      aws_pubsub_region: awsExports.aws_project_region,
      aws_pubsub_endpoint: state.iotEndpoint,
    }));
    state.iotProviderConfigured = true;
  }
  else {
    console.log('Amplify IoT provider already configured.');
  }
  
  
}

//------------------------------------------------------------------------------
async function attachIoTPolicyToUser() {

  // This should be the custom cognito attribute that tells us whether the user's
  // federated identity already has the necessary IoT policy attached:
  const IOT_ATTRIBUTE_FLAG = 'custom:iotPolicyIsAttached';

  var userInfo = await Auth.currentUserInfo({bypassCache: true});
  var iotPolicyIsAttached = userInfo.attributes[IOT_ATTRIBUTE_FLAG] === "true";

  if (!iotPolicyIsAttached) {

    const apiName = 'apiTeam02Demo01';
    const path = '/attachIoTPolicyToFederatedUser'; 
    const myInit = {
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
  
    console.log(`Calling API GET ${path} to attach IoT policy to federated user...`);
    var response = await API.get(apiName, path, myInit);
    console.log(`GET ${path} ${response.status} response:\n ${JSON.stringify(response.data,null,2)}`);
    console.log(`Attached IoT Policy to federated user.`)

  }
  else {
    console.log(`Federated user ID already attached to IoT Policy.`);
  }
}

//------------------------------------------------------------------------------
function updateState(key, value) {
  console.log(key, value);
  state[key] = value;
  var localKey = `${LOCAL_STORAGE_KEY}-${key}`;
  localStorage.setItem(localKey, value);
}

//------------------------------------------------------------------------------
function handleReceivedMessage(data) {

  // Received messages contain the topic name in a Symbol that we have to decode: 
  const symbolKey = Reflect.ownKeys(data.value).find(key => key.toString() === 'Symbol(topic)');
  const publishedTopic = data.value[symbolKey];
  const message = JSON.stringify(data.value, null, 2);

  console.log(`Message received on ${publishedTopic}:\n ${message}`);
  if (state.message_count >= state.message_history_limit) {
    state.messages.shift();
  }
  else {
    state.message_count += 1;
  }
  const timestamp = new Date().toISOString();
  state.messages.push(`${timestamp} - topic '${publishedTopic}':\n ${message}\n\n`);
}

//------------------------------------------------------------------------------
function subscribeToTopic() {
  
  // Fired when user clicks subscribe button:
  if (state.isSubscribed) {
    state.subscription.unsubscribe();
    console.log(`Unsubscribed from ${state.subscribedTopic}`);
    state.isSubscribed = false;
    state.subscribedTopic = '';
  }
  state.subscription = PubSub.subscribe(state.subscribeTopicInput).subscribe({
    next: data => handleReceivedMessage(data),
    error: error => console.error(error),
    close: () => console.log('Done'),
  });
  state.isSubscribed = true;
  state.subscribedTopic = state.subscribeTopicInput;
  console.log(`Subscribed to IoT topic ${state.subscribeTopicInput }`);
  
}

//------------------------------------------------------------------------------
function sendMessage() {
  // Fired when user clicks the publish button:
  PubSub.publish(state.publishTopicInput, JSON.parse(state.publishMessage));
}

function sendNewMessage() {
  const message = {
    device_id: "358777078066017",
    timestamp: new Date().toISOString(),
    led_bright: state.led_bright,
    led_flashing_speed: state.led_flashing_speed,
    led_flashing_mode: state.led_flashing_mode
  };
  PubSub.publish(state.publishTopicInput, message);
}

function updateFormValuesFromLocalStorage() {
  for (const [key] of Object.entries(state)) {
    if (stateKeysToSave.includes(key)) {
      console.log(`Getting ${key} from local storage...`);
      var localStorageValue = localStorage.getItem(`${LOCAL_STORAGE_KEY}-${key}`);

      if (localStorageValue) {
        // Convert true or false strings to boolean (needed for checkboxes):
        if (["true", "false"].includes(localStorageValue)) {
          localStorageValue = localStorageValue === "true";
        } else if (key === "publishMessage") {
          // If the key is 'publishMessage', attempt to parse the value as JSON
          try {
            localStorageValue = JSON.parse(localStorageValue);
          } catch (error) {
            console.error("Failed to parse publishMessage from localStorage:", error);
          }
        }
        state[key] = localStorageValue;
        console.log('value =', localStorageValue);
      }
    }
  }
}


export default view(EventViewer); 