// ... [rest of the imports]

const DeviceViewer = () => {
    const [deviceID, setDeviceID] = useState('');
    const [devices, setDevices] = useState([]);
    const [selectedDeviceData, setSelectedDeviceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const callAPI = async () => {
      // ... [rest of the code]
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
            // ... [rest of the code]
          />
          <Button variant="contained" color="primary" onClick={callAPI} style={{ margin: '0px 20px' }}>
            Call API
          </Button>
        </div>
        
        // ... [rest of the code]
  
        <div>
          {devices.map(device => (
            <Card key={`${device.device_id}-${device.timestamp}`} style={{ margin: '20px 0' }} onClick={() => fetchDeviceDetails(device.device_id)}>
              <CardContent>
                // ... [rest of the code]
              </CardContent>
            </Card>
          ))}
        </div>
  
        <div>
          {selectedDeviceData.map(data => (
            // Display the details of the selected device here, similar to the code above
          ))}
        </div>
      </div>
    );
  };
  
  export default DeviceViewer;
  