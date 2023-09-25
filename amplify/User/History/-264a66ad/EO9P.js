import { API } from 'aws-amplify';

async function fetchOpenSearchEndpoint() {
    try {
        const response = await API.get('apiTeam02Demo01', '/opensearch', {});
        console.log("OpenSearch Endpoint:", response);
        return response;
    } catch (error) {
        console.error("Error fetching OpenSearch Endpoint:", error);
    }
}

export default fetchOpenSearchEndpoint;
