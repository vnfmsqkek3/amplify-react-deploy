import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

const DeviceViewer = () => {
  const [deviceID, setDeviceID] = useState('');
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = async () => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceID: deviceID }),
      };
      
      const response = await fetch("https://6xt6dqy6eh.execute-api.ap-northeast-2.amazonaws.com/dev-ctc-hiq", requestOptions);
      const result = await response.json();

      const parsedDevices = JSON.parse(result.body);
      setDevices(parsedDevices);
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
        <Button variant="contained" color="primary" onClick={callAPI}>
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
          <Card key={device.device_id} style={{ margin: '20px 0' }}>
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
              <Typography>
                Battery Voltage (BATV): {device.batv}V
              </Typography>
              <Typography>
                LED OFF Charge: {device.led_off_char}
              </Typography>
              <Typography>
                LED OFF Use: {device.led_off_use}
              </Typography>
              <Typography>
                LED ON Use: {device.led_on_use}
              </Typography>
              <Typography>
                Temperature (TEMP): {device.temp}°C
              </Typography>
              <Typography>
                Humidity (HUMI): {device.humi}%
              </Typography>
              <Typography>
                Azimuth (AZI): {device.azi}
              </Typography>
              <Typography>
                CDS: {device.cds}
              </Typography>
              <Typography>
                Power: {device.power}
              </Typography>
              <Typography>
                LED Speed: {device.led_speed}
              </Typography>
              <Typography>
                LED Mode: {device.led_mode}
              </Typography>
              <Typography>
                Relief: {device.relief}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeviceViewer;
