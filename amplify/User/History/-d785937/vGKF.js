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
        {deviceDetails.map(device => (
          // ... (The existing code for rendering the device details goes here.)
        ))}
      </div>
    </div>
  );
};

export default DeviceViewer;
