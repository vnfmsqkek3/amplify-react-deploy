import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports.js";

async function getOpenSearchEndpoint(domainName) {
    const credentials = await Auth.currentCredentials();
    const es = new AWS.ES({
        region: awsExports.aws_project_region,
        credentials: Auth.essentialCredentials(credentials)
    });

    const response = await es.describeElasticsearchDomain({ DomainName: domainName }).promise();
    return response.DomainStatus.Endpoint;
}

// 사용 예:
const domainName = "ops-ctc-iot-dashboard-public";
const endpoint = await getOpenSearchEndpoint(domainName);
console.log(`Your OpenSearch Endpoint is: ${endpoint}`);
