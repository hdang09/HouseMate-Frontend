import { Badge, Typography } from 'antd';

import JobList from '@/components/JobList';
import { JobSection } from '@/pages/Staff/Job/Job.styled';

import { NewLabel } from './New.styled';
import { dummy } from './New.dummy';

const { Title } = Typography;

const New = () => {
    return (
        <JobSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Việc mới</Title>
            </Badge>

            <JobList list={dummy} label={<NewLabel>New</NewLabel>} />
        </JobSection>
    );
};

export default New;
