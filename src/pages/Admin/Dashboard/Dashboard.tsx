import { useDocumentTitle } from '@/hooks';

const Dashboard = () => {
    useDocumentTitle('Tổng Quan | HouseMate');

    return <h1>Dashboard</h1>;
};

Dashboard.propTypes = {};

export default Dashboard;
