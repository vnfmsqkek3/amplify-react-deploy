import React, { useState, useEffect } from 'react';
import Amplify, { API } from 'aws-amplify';
import awsExports from "../../aws-exports.js";

Amplify.configure(awsExports);

const OpenSearchDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const response = await API.get('apiTeam02Demo01', '/dashboard'); 
                setDashboardData(response);
            } catch (error) {
                console.error('Error fetching OpenSearch dashboard data:', error);
            }
        }

        fetchDashboardData();
    }, []);

    // TODO: dashboardData를 사용하여 원하는 컴포넌트나 UI를 렌더링하세요.
    // 현재는 단순히 데이터를 출력하도록 설정했습니다.
    return (
        <div>
            <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
        </div>
    );
}

export default OpenSearchDashboard;
