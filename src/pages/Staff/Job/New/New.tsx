import { Badge, Typography } from 'antd';

import JobList from '@/components/JobList';
import config from '@/config';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';

import { dummy } from './New.dummy';
import { NewLabel } from './New.styled';

const { Title } = Typography;

const New = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Việc mới</Title>
            </Badge>

            <JobList list={dummy} link={config.routes.staff.job} label={<NewLabel>New</NewLabel>} />
        </StaffSection>
    );
};

export default New;
