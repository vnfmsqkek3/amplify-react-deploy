import React, { useState, useEffect } from 'react';
import { Amplify, API } from 'aws-amplify';
import awsExports from "../../aws-exports.js";
import Widget from './widget.js'; // 위젯 컴포넌트를 가져옵니다.

Amplify.configure(awsExports);

const OpenSearchDashboard = () => {
    const [dashboardUrl, setDashboardUrl] = useState(null);

    useEffect(() => {
        async function fetchDashboardUrl() {
            try {
                const response = await API.get('apiTeam02Demo01', '/opensearch'); 
                setDashboardUrl(response.url);
            } catch (error) {
                console.error('Error fetching OpenSearch dashboard URL:', error);
            }
        }

        fetchDashboardUrl();
    }, []);

    if (!dashboardUrl) {
        return <div>Loading...</div>;
    }

    return (
        <Widget> {/* 위젯 컴포넌트로 iframe을 감쌉니다. */}
            <iframe 
                src={dashboardUrl} 
                title="OpenSearch Dashboard" 
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
            ></iframe>
        </Widget>
    );
}

export default OpenSearchDashboard;
