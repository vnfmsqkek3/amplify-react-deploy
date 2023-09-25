// opensearch.js
import { API, Auth } from 'aws-amplify';

export async function OpenSearchDashboard(query) {
    try {
        // Cognito에서 인증된 사용자의 토큰을 가져옵니다.
        const session = await Auth.currentSession();
        const idToken = session.getIdToken().getJwtToken();

        // API Gateway를 사용하여 Lambda 함수 호출
        // 이 예제에서는 API Gateway의 endpoint 이름을 'apiTeam02Demo01'라고 가정합니다.
        const response = await API.get('apiTeam02Demo01', '/opensearch/', {
            headers: {
                'Authorization': idToken
                // 필요한 경우 다른 헤더를 추가합니다.
            },
            body: {
                query: query
            }
        });

        return response;

    } catch (error) {
        console.error("Error in OpenSearchDashboard: ", error);
        throw error;
    }
}

export default OpenSearchDashboard;
