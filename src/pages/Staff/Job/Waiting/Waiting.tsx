import { Badge, Typography } from 'antd';

import JobList from '@/components/JobList';
import config from '@/config';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';

import { dummy } from './Waiting.dummy';

const { Title } = Typography;

const Waiting = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Chờ xác nhận</Title>
            </Badge>

            <JobList list={dummy} link={config.routes.staff.job} title="Đang chờ xác nhận" />
        </StaffSection>
    );
};

export default Waiting;
