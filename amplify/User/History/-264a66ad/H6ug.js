// opensearch.js
import React from 'react';
import Widget from './widget';

const OpenSearchDashboard = () => {
    const dashboardUrl = "https://team02demo.auth.ap-northeast-2.amazoncognito.com/";

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
