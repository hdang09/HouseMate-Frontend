import { Badge, Typography } from 'antd';
import { JobSection } from './Job.styled';

const { Title } = Typography;

const JobNew = () => {
    return (
        <JobSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Việc mới</Title>
            </Badge>
        </JobSection>
    );
};

export default JobNew;
