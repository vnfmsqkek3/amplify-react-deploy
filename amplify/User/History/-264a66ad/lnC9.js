// opensearch.js

import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import awsExports from "../../aws-exports.js";

async function getOpenSearchEndpoint(domainName) {
    const credentials = await Auth.currentCredentials();
    const es = new AWS.Elasticsearch({
        region: awsExports.aws_project_region,
        credentials: Auth.essentialCredentials(credentials)
    });

    const response = await es.describeElasticsearchDomain({ DomainName: domainName }).promise();
    return response.DomainStatus.Endpoint;
}

export default getOpenSearchEndpoint;
