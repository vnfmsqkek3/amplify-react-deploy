const AWS = require('aws-sdk');
const es = new AWS.ES();

exports.handler = async (event) => {
    const domainName = "ops-ctc-iot-dashboard-public"; // OpenSearch 도메인 이름으로 변경

    try {
        const response = await es.describeElasticsearchDomain({ DomainName: domainName }).promise();
        const endpoint = response.DomainStatus.Endpoint;

        return {
            statusCode: 200,
            body: JSON.stringify({ endpoint: endpoint })
        };
    } catch (error) {
        console.error("Error fetching OpenSearch Endpoint:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch OpenSearch Endpoint" })
        };
    }
};
