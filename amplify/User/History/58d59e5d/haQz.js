import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Grid } from '@mui/material';
import { API } from 'aws-amplify';

const DeviceViewer = () => {
  const [keyword, setKeyword] = useState('');
  const [allDevices, setAllDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const callAPI = async () => {
    setIsLoading(true);
    try {
      const apiName = 'apiTeam02Demo01';
      const path = '/amplifyhiqrdsQuery-dev';
      const result = await API.get(apiName, path);
      setAllDevices(result);
    } catch (error) {
      console.error("API call error:", error);
    }
    setIsLoading(false);
  };

  const fetchDeviceDetails = async (deviceID) => {
    setIsLoading(true);
    setSelectedDevice(deviceID);
    try {
      const apiName = 'apiTeam02Demo01';
      const path = '/amplifyhiqrdsQuery-dev';
      const requestOptions = {
        body: { deviceID: deviceID },
      };
      const result = await API.get(apiName, path, requestOptions);
      setDeviceDetails(result);
    } catch (error) {
      console.error("API call error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>IoT Message Viewer</h2>
      <TextField
        id="keyword"
        label="Device ID Keyword"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        style={{ marginRight: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={callAPI}>
        Call API
      </Button>

      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <h3>Devices</h3>
          {allDevices.map(deviceID => (
            <Card 
              key={deviceID}
              onClick={() => fetchDeviceDetails(deviceID)}
              style={{
                margin: '10px 0',
                backgroundColor: selectedDevice === deviceID ? 'blue' : 'transparent',
                color: selectedDevice === deviceID ? 'white' : 'black'
              }}
            >
              <CardContent>
                Device ID: {deviceID}
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={6}>
          <h3>Device Details</h3>
          {isLoading && (
            <div>
              Loading...
            </div>
          )}
          {deviceDetails.length === 0 && !isLoading && (
            <div>
              Not Found
            </div>
          )}
          {deviceDetails.map(device => (
            <Card key={`${device.device_id}-${device.timestamp}`} style={{ margin: '20px 0' }}>
              <CardContent>
              <Typography variant="h6" component="h2">
                Device ID: {device.device_id}
              </Typography>
              <Typography>
                Timestamp: {device.timestamp}
              </Typography>
              <Typography>
                  Location: Lat: {device.location ? device.location.lat : 'N/A'}, 
                  Lon: {device.location ? device.location.lon : 'N/A'}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default DeviceViewer;
