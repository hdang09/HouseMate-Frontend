import { Badge, Typography } from 'antd';
import JobList from '@/components/JobList';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import { dummy } from './Pending.dummy';

const { Title } = Typography;

const Pending = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Đang chờ</Title>
            </Badge>

            <JobList list={dummy} formattedDate />
        </StaffSection>
    );
};

export default Pending;