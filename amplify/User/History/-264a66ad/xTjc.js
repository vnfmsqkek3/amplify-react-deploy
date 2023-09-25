import { API, Amplify } from 'aws-amplify';
import awsconfig from '../../aws-exports'; // aws-exports.js 파일의 경로에 맞게 수정

Amplify.configure(awsconfig);

async function fetchOpenSearchEndpoint() {
  try {
    const result = await API.get('apiTeam02Demo01', '/OpenSearchProxy-dev', {});
    return result.endpoint;
  } catch (error) {
    console.error('Error fetching endpoint', error);
    throw error;
  }
}

export default fetchOpenSearchEndpoint;
