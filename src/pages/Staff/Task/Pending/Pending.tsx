import { Badge, Typography } from 'antd';

import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';

const { Title } = Typography;

const Pending = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Đang chờ</Title>
            </Badge>

            {/* <JobList list={dummy} link={config.routes.staff.task} formattedDate /> */}
        </StaffSection>
    );
};

export default Pending;
