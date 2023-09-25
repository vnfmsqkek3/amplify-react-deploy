// opensearch.js
import React from 'react';
import Widget from './widget';

const OpenSearchDashboard = () => {
    const dashboardUrl = "https://search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com/_dashboards";

    return (
        <Widget style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <iframe 
                src={dashboardUrl} 
                title="OpenSearch Dashboard" 
                style={{ flexGrow: 1, width: '100%', height:"100%", border: 'none' }}
            ></iframe>
        </Widget>
    );
}

export default OpenSearchDashboard;
