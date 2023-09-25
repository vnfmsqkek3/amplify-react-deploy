const https = require('https');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'https://search-ops-ctc-iot-dashboard-public-mjk2mevredhxijleeoh4sq3hnm.ap-northeast-2.es.amazonaws.com',
            path: '/_dashboards',
            method: 'GET'
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
            });
        });

        req.on('error', (err) => {
            console.error(err);
            reject({
                statusCode: 500,
                body: JSON.stringify(err)
            });
        });

        req.end();
    });
};
