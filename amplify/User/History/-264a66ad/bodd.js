import React from 'react';

const OpenSearchDashboard = () => {
    const dashboardUrl = "YOUR_OPENSEARCH_DASHBOARD_URL_HERE"; // 대시보드 URL을 여기에 삽입합니다.

    return (
        <div style={{ width: '100%', height: '100vh' }}>
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