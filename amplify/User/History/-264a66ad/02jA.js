import { API } from 'aws-amplify';

async function fetchOpenSearchEndpoint() {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Failed to get authentication token");
  }

  try {
    const result = await API.get('apiTeam02Demo01', '/opensearch', {
      headers: {
        'Authorization': token
      }
    });
    return result;
  } catch (error) {
    console.error('Error fetching endpoint', error);
    throw error;
  }
}

export default fetchOpenSearchEndpoint;
