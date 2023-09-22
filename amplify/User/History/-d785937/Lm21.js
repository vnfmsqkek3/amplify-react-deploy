import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const DeviceViewer = () => {
  const [deviceID, setDeviceID] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDeviceData, setSelectedDeviceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = async () => {
    // ... (Your existing callAPI function code)
  };

  const fetchDeviceDetails = async (deviceId) => {
    setIsLoading(true);
    try {
      const apiName = 'apiTeam02Demo01';
      const path = '/amplifyhiqrdsQuery-dev';
      const requestOptions = {
        body: { deviceID: deviceId },
      };

      const result = await API.get(apiName, path, requestOptions);
      setSelectedDeviceData(result);

    } catch (error) {
      console.error("API call error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>IoT Message Viewer</h2>
      <div>
        <TextField
          // ... (Your existing TextField code)
        />
        <Button variant="contained" color="primary" onClick={callAPI} style={{ margin: '0px 20px' }}>
          Call API
        </Button>
      </div>

      // ... (Your existing code for displaying isLoading and empty states)

      <div>
        {devices.map(device => (
          <Card key={`${device.device_id}-${device.timestamp}`} style={{ margin: '20px 0' }} onClick={() => fetchDeviceDetails(device.device_id)}>
            <CardContent>
              // ... (Your existing code for displaying device details in the Card)
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        {selectedDeviceData.map(data => (
          // Here, you can display the details of the selected device, similar to the code above.
        ))}
      </div>
    </div>
  );
};

export default DeviceViewer;
