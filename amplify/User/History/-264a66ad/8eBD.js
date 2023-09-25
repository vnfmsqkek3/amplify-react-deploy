import React from 'react';
import Paper from '@mui/material/Paper';

const OpenSearchDashboard = () => {
    const dashboardUrl = "https://search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com/_dashboards"; // 대시보드 URL을 여기에 삽입합니다.

    return (
        <Paper style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
            <iframe 
                src={dashboardUrl} 
                title="OpenSearch Dashboard" 
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
            ></iframe>
        </Paper>
    );
}

export default OpenSearchDashboard;
