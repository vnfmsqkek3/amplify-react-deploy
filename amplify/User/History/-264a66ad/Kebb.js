import { API } from 'aws-amplify';

export async function fetchDataFromOpenSearch(query) {
    // API Gateway를 사용하여 Lambda 함수 호출
    // 이 예제에서는 API Gateway의 endpoint 이름을 'opensearchAPI'라고 가정합니다.
    const response = await API.get('apiTeam02Demo01', '/opensearch/', {
        headers: {
            // 필요한 경우 헤더를 추가합니다.
        },
        body: {
            query: query
        }
    });

    return response;
}
