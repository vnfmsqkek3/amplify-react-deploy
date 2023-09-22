import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const DeviceViewer = () => {
  const [deviceID, setDeviceID] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDeviceData, setSelectedDeviceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = async () => {
    setIsLoading(true);
    try {
      const apiName = 'apiTeam02Demo01';
      const path = '/amplifyhiqrdsQuery-dev';
      const requestOptions = {
        body: { deviceID: deviceID },
      };

      const result = await API.get(apiName, path, requestOptions);
      setDevices(result);
      
    } catch (error) {
      console.error("API call error:", error);
    }
    setIsLoading(false);
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
          id="deviceID"
          label="Device ID"
          value={deviceID}
          onChange={e => setDeviceID(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={callAPI} style={{ margin: '0px 20px' }}>
          Call API
        </Button>
      </div>

      {isLoading && (
        <div>
          Loading...
        </div>
      )}

      {devices.length === 0 && !isLoading && (
        <div>
          Not Found
        </div>
      )}

      <div>
        {devices.map(device => (
          <Card key={`${device.device_id}-${device.timestamp}`} style={{ margin: '20px 0' }} onClick={() => fetchDeviceDetails(device.device_id)}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Device ID: {device.device_id}
              </Typography>
              {/* And other device details... */}
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        {selectedDeviceData.map(data => (
          <Card key={`${data.device_id}-${data.timestamp}`} style={{ margin: '20px 0' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Device ID: {data.device_id}
              </Typography>
              {/* And other selected device details... */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceViewer;
