import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const DeviceViewer = () => {
  const [deviceID, setDeviceID] = useState('');
  const [devices, setDevices] = useState([]);
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
          <Card key={`${device.device_id}-${device.timestamp}`} style={{ margin: '20px 0' }}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Device ID: {device.device_id}
              </Typography>
              <Typography>
                Timestamp: {device.timestamp}
              </Typography>
              <Typography>
                Location: Lat: {device.location.lat}, Lon: {device.location.lon}
              </Typography>
              <Typography>
                Solar Voltage (SOLV): {device.solv}V
              </Typography>
              {/* ... [Include all other fields in a similar manner as shown above] */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceViewer;
