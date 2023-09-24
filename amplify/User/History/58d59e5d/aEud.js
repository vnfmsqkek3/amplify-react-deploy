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
        <div>
            <Widget>
                <h2>Query RDS</h2>
                <Button variant="contained" color="primary" onClick={() => callAPI()}>
                    Call API
                </Button>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        {allDevices.map(deviceID => (
                            <Card
                                key={deviceID}
                                onClick={() => callAPI(deviceID)}
                                style={{
                                    backgroundColor: selectedDevice === deviceID ? '#e0e0e0' : 'transparent',
                                    margin: '10px 0'
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
                    <Grid item xs={12} md={6}>
                        {selectedDevice && (
                            <div>
                                {isLoading && <div>Loading...</div>}
                                {!deviceDetails && !isLoading && <div>Not Found</div>}
                                {deviceDetails && deviceDetails.map(device => (
                                    <Card key={device.device_id} style={{ margin: '10px 0' }}>
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
                        )}
                    </Grid>
                </Grid>
            </Widget>
        </div>
    );
}

export default DeviceViewer;
