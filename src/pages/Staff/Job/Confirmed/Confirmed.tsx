import { Badge, Typography } from 'antd';

import JobList from '@/components/JobList';
import { JobSection } from '@/pages/Staff/Job/Job.styled';
import { dummy } from './Confirmed.dummy';

const { Title } = Typography;

const Confirmed = () => {
    return (
        <JobSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Đã xác nhận</Title>
            </Badge>

            <JobList list={dummy} successText="Đã nhận việc" cancelText="Đã từ chối" />
        </JobSection>
    );
};

export default Confirmed;
