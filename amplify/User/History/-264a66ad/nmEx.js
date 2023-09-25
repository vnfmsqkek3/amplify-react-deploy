import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports.js";

async function getOpenSearchEndpoint(domainName) {
    // Cognito에서 인증된 사용자의 AWS 자격증명을 가져옵니다.
    const credentials = await Auth.currentCredentials();
    AWS.config.update({
        region: awsExports.aws_project_region,
        credentials: Auth.essentialCredentials(credentials)
    });
    const es = new AWS.ES();

    try {
        const response = await es.describeElasticsearchDomain({ DomainName: domainName }).promise();
        return response.DomainStatus.Endpoint;
    } catch (error) {
        console.error("Error getting OpenSearch endpoint:", error);
        throw error;
    }
}

export default getOpenSearchEndpoint;
