import { Badge, Typography } from 'antd';

import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';

const { Title } = Typography;

const Done = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Đã hoàn thành</Title>
            </Badge>

            {/* <JobList
                list={dummy}
                link={config.routes.staff.task}
                successText="Hoàn thành"
                cancelText="bị hủy"
            /> */}
        </StaffSection>
    );
};

export default Done;
