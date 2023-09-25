import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const [dashboardData, setDashboardData] = React.useState(null);

React.useEffect(() => {
    async function fetchDashboardData() {
        try {
            const response = await API.get('apiTeam02Demo01', '/dashboard'); // 여기서 'YOUR_API_NAME'은 aws-exports.js 파일에서 확인하실 수 있습니다.
            setDashboardData(response);
        } catch (error) {
            console.error('Error fetching OpenSearch dashboard data:', error);
        }
    }

    fetchDashboardData();
}, []);
