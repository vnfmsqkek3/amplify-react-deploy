const https = require('https');
const AWS = require('aws-sdk');
const Amplify = require('aws-amplify').default;

// Amplify 설정
Amplify.configure({
    Auth: {
        // Amplify 설정에 필요한 상세 정보를 여기에 추가해야 합니다.
        region: 'ap-northeast-2',
        userPoolId: 'ap-northeast-2_3jqEHLSzD',
        userPoolWebClientId: '5qrusgeellf9re9283lmceiot7',
    }
});

exports.handler = async (event) => {
    return new Promise(async (resolve) => {
        // 토큰 값을 가져옵니다.
        const token = await Amplify.Auth.currentSession().then(session => session.getIdToken().getJwtToken()).catch(err => {
            console.error("Error fetching token:", err);
            resolve({
                statusCode: 500,
                body: `Failed to retrieve token: ${JSON.stringify(err)}`,
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        });

        const options = {
            host: 'search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com/_dashboards/app/home#/',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가합니다.
                // 필요한 경우 추가 헤더를 여기에 삽입합니다.
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve({
                        statusCode: 200,
                        body: data,
                        headers: {
                            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                } else {
                    resolve({
                        statusCode: 500,
                        body: `Unexpected server response: ${data}`,
                        headers: {
                            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                            'Access-Control-Allow-Origin': '*'
                        }
                    });
                }
            });
        });

        req.on('error', (err) => {
            console.error(err);
            resolve({
                statusCode: 500,
                body: `Internal server error: ${JSON.stringify(err)}`,
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        });

        req.end();
    });
};
