import { useDocumentTitle } from '@/hooks';
import { Col, Row } from 'antd';
import DashboardItem from './components/DashboardItem';
import { AiOutlineStock, AiOutlineTeam, AiOutlineTransaction } from 'react-icons/ai';
import { theme } from '@/themes';
import UserLineChart from '@/pages/Admin/Dashboard/components/Chart/UserLineChart';
import * as Styled from './Dashboard.styled';

const Dashboard = () => {
    useDocumentTitle('Tổng Quan | HouseMate');

    return (
        <div>
            <Row justify={'space-between'}>
                <DashboardItem
                    icon={<AiOutlineStock size={36} />}
                    title="Số giao dịch mới"
                    data={112893}
                    ratio={3.4}
                    color={theme.colors.success}
                />

                <DashboardItem
                    icon={<AiOutlineTransaction size={36} />}
                    title="Tổng doanh thu"
                    data={112893}
                    ratio={3.4}
                    color={theme.colors.starIcon}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số khách hàng"
                    data={112893}
                    ratio={3.4}
                    color={theme.colors.primary}
                />

                <DashboardItem
                    icon={<AiOutlineTeam size={36} />}
                    title="Tổng số khách hàng mới"
                    data={112893}
                    ratio={3.4}
                    color={theme.colors.primary}
                />
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col>
                    <Styled.ChartWrapper>
                        <UserLineChart />
                    </Styled.ChartWrapper>
                </Col>
            </Row>
        </div>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
