import { API, Auth, Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports.js'; // aws-exports.js 파일의 경로에 맞게 수정

Amplify.configure(awsconfig);

async function getAWSCredentials() {
  try {
    const credentials = await Auth.currentCredentials();
    return credentials;
  } catch (error) {
    console.error("Error getting AWS credentials:", error);
    return null;
  }
}

async function fetchOpenSearchEndpoint() {
  const credentials = await getAWSCredentials();
  if (!credentials) {
    throw new Error("Failed to get AWS credentials");
  }

  const { accessKeyId, secretAccessKey, sessionToken } = credentials;

  try {
    const result = await API.get('apiTeam02Demo01', '/OpenSearchProxy-dev', {
      headers: {
        'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${secretAccessKey}, SignedHeaders=content-type;host;x-amz-date, Signature=${sessionToken}`
      }
    });
    return result.endpoint;
  } catch (error) {
    console.error('Error fetching endpoint', error);
    throw error;
  }
}

export default fetchOpenSearchEndpoint;
