import React, { useEffect, useState } from 'react';
import fetchOpenSearchEndpoint from './src/components/widgets/opensearch';

function OpenSearchDashboard() {
    const [endpoint, setEndpoint] = useState("");

    useEffect(() => {
        async function loadEndpoint() {
            const result = await fetchOpenSearchEndpoint();
            setEndpoint(result);
        }

        loadEndpoint();
    }, []);

    return (
        <div>
            <h2>OpenSearch Dashboard</h2>
            <p>Endpoint: {endpoint}</p>
            {/* 여기에 OpenSearch Dashboard와 관련된 다른 코드/컴포넌트를 추가하세요. */}
        </div>
    );
}

export default OpenSearchDashboard;
