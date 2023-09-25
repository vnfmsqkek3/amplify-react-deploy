import React from 'react';

const OpenSearchDashboard = () => {
    const dashboardUrl = "https://search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com/_dashboards"; // 대시보드 URL을 여기에 삽입합니다.

    return (
        <div style={{ width: 'calc(100% - 240px)', height: '100vh' }}>  {/* 240px는 위젯 메뉴의 폭을 가정한 값입니다. 실제 값에 따라 조절해야 합니다. */}
            <iframe 
                src={dashboardUrl} 
                title="OpenSearch Dashboard" 
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
            ></iframe>
        </div>
    );
}

export default OpenSearchDashboard;
