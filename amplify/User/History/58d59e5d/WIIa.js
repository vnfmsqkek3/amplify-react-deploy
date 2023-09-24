import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { API } from 'aws-amplify';
import Widget from './widget';

const DeviceViewer = () => {
    const [allDevices, setAllDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [deviceDetails, setDeviceDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const callAPI = async (specificDeviceID = null) => {
        setIsLoading(true);
        setDeviceDetails(null); // set to null before fetching

        try {
            const apiName = 'apiTeam02Demo01';
            const path = specificDeviceID ? `/amplifyhiqrdsQuery-dev?deviceID=${specificDeviceID}` : '/amplifyhiqrdsQuery-dev';
            const requestOptions = {};
            const result = await API.get(apiName, path, requestOptions);
            const parsedResult = typeof result === 'string' ? JSON.parse(result) : result;

            if (specificDeviceID) {
                setSelectedDevice(specificDeviceID);
                setDeviceDetails(parsedResult);
            } else {
                setAllDevices(parsedResult);
            }
        } catch (error) {
            console.error("API call error:", error);
        }
        setIsLoading(false);
    };

    return (
      <Widget>
        <h2>Query RDS</h2>
        <Button variant="contained" color="primary" onClick={() => callAPI()}>
          Call API
        </Button>
    
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}> {/* xs 값을 변경하여 deviceID 카드의 크기를 줄였습니다. */}
            {allDevices.map(deviceID => (
              <Card 
                key={deviceID} 
                onClick={() => callAPI(deviceID)}
                style={{ 
                  backgroundColor: selectedDevice === deviceID ? '#e0e0e0' : 'transparent', 
                  margin: '10px',
                  cursor: 'pointer',
                  width : '250px',
                  height: '100px'  // 카드의 높이를 제한하여 크기를 줄였습니다.
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Device ID: {deviceID}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
    
          <Grid item xs={6} md={6}> {/* md 값을 변경하여 deviceID 카드와 device.device_id 카드의 공간 비율을 조절했습니다. */}
            {selectedDevice ? (
              <div>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div style={{ overflowY: 'auto', maxHeight: '500px' }}> {/* 스크롤 기능을 추가하여 전체 내용이 보이게 했습니다. */}
                    {!deviceDetails ? (
                      <div>Not Found</div>
                    ) : (
                      deviceDetails.map(device => (
                        <Card key={device.device_id} style={{ margin: '10px' }}>
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
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Typography variant="subtitle1">Select a device ID to view details.</Typography>
            )}
          </Grid>
        </Grid>
      </Widget>
    );
            }
  
  export default DeviceViewer;
