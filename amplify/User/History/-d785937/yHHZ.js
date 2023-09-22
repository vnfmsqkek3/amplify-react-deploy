import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { API } from 'aws-amplify';

const DeviceViewer = () => {
  const [allDevices, setAllDevices] = useState([]); // to hold unique device IDs
  const [selectedDevice, setSelectedDevice] = useState(null); // to hold the clicked device ID
  const [deviceDetails, setDeviceDetails] = useState([]); // to hold details of the clicked device ID
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
      <Button variant="contained" color="primary" onClick={callAPI}>
        Call API
      </Button>

      <div>
        {allDevices.map(deviceID => (
          <div 
            key={deviceID} 
            style={{backgroundColor: selectedDevice === deviceID ? 'blue' : 'transparent'}}
            onClick={() => fetchDeviceDetails(deviceID)}>
            {deviceID}
          </div>
        ))}
      </div>

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
      </div>
    </div>
  );
};

export default DeviceViewer;
