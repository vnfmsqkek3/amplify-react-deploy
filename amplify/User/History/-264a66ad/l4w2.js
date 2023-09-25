import React from 'react';
import Drawer from '@mui/material/Drawer';

const OpenSearchDashboard = () => {
    const dashboardUrl = "https://search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com/_dashboards"; // 대시보드 URL을 여기에 삽입합니다.

    return (
        <Paper
            variant="permanent"
            open={true}
            style={{ width: 'calc(100% - 240px)' }}  // 240px는 위젯 메뉴의 폭을 가정한 값입니다. 실제 값에 따라 조절해야 합니다.
        >
            <div style={{ width: '100%', height: '100vh' }}>
                <iframe 
                    src={dashboardUrl} 
                    title="OpenSearch Dashboard" 
                    style={{ width: '100%', height: '100%' }}
                    frameBorder="0"
                ></iframe>
            </div>
        </Paper>
    );
}

export default OpenSearchDashboard;
