import React, { useState, useEffect } from 'react';
import { Amplify,  API } from 'aws-amplify';
import awsExports from "../../aws-exports.js";

Amplify.configure(awsExports);

const OpenSearchDashboard = () => {
    const [dashboardUrl, setDashboardUrl] = useState(null);

    useEffect(() => {
        async function fetchDashboardUrl() {
            try {
                // AWS API Gateway 엔드포인트를 호출하여 대시보드 URL을 가져옵니다.
                const response = await API.get('apiTeam02Demo01', '/opensearch'); 
                setDashboardUrl(response.url); // 응답 형식에 따라 변경될 수 있습니다.
            } catch (error) {
                console.error('Error fetching OpenSearch dashboard URL:', error);
            }
        }

        fetchDashboardUrl();
    }, []);

    if (!dashboardUrl) {
        return <div>Loading...</div>; // URL을 기다리는 동안 로딩 메시지 표시
    }

    return (
        <iframe 
            src={dashboardUrl} 
            title="OpenSearch Dashboard" 
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
        ></iframe>
    );
}

export default OpenSearchDashboard;
