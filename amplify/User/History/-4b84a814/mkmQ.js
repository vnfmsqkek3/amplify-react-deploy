import React, { useState, useEffect } from 'react';
import getOpenSearchEndpoint from './opensearch';
import Widget from './widget';

function OpenSearchWidgetComponent() {
    const [endpoint, setEndpoint] = useState(null);

    useEffect(() => {
        async function loadEndpoint() {
            const domainName = "ops-ctc-iot-dashboard-public";
            const fetchedEndpoint = await getOpenSearchEndpoint(domainName);
            setEndpoint(fetchedEndpoint);
        }
        loadEndpoint();
    }, []);

    return (
        <Widget>
            {endpoint ? (
                <div>Your OpenSearch Endpoint is: {endpoint}</div>
            ) : (
                <div>Loading...</div>
            )}
        </Widget>
    );
}

export default OpenSearchWidgetComponent;
