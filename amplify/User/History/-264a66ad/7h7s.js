// opensearch.js
import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';

async function fetchOpenSearchEndpoint() {
    const region = 'ap-northeast-2';
    const endpoint = 'https://5b4q243ez2.execute-api.ap-northeast-2.amazonaws.com/dev/OpenSearchProxy-dev';

    const credentials = await Auth.currentCredentials();
    AWS.config.update({
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        region: region
    });

    const request = new AWS.HttpRequest(endpoint, region);
    request.method = 'GET';
    request.headers.host = '5b4q243ez2.execute-api.ap-northeast-2.amazonaws.com';
    request.headers['Content-Type'] = 'application/json';

    const signer = new AWS.Signers.V4(request, 'execute-api');
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': request.headers.Authorization,
            'X-Amz-Date': request.headers['X-Amz-Date'],
            'Host': request.headers.host,
            'Content-Type': request.headers['Content-Type']
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch with status ${response.status}`);
    }
    return await response.json();
}

export default fetchOpenSearchEndpoint;
