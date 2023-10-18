import { Badge, Typography } from 'antd';

import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import JobList from '@/components/JobList';
import { dummy } from './Confirmed.dummy';

const { Title } = Typography;

const Confirmed = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Đã xác nhận</Title>
            </Badge>

            <JobList list={dummy} successText="Đã nhận việc" cancelText="Đã từ chối" />
        </StaffSection>
    );
};

export default Confirmed;
