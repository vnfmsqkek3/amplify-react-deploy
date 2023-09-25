// opensearch.js
import { API, Auth } from 'aws-amplify';

async function getAuthToken() {
  try {
    const session = await Auth.currentSession();
    return session.getAccessToken().getIdToken();
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

async function fetchOpenSearchEndpoint() {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Failed to get authentication token");
  }

  try {
    const result = await API.get('apiTeam02Demo01', '/OpenSearchProxy-dev', {
      headers: {
        'Authorization': token
      }
    });
    return result.endpoint; // 이 부분이 수정됨. endpoint 값을 직접 반환
  } catch (error) {
    console.error('Error fetching endpoint', error);
    throw error;
  }
}

export default fetchOpenSearchEndpoint;
