import { Badge, Typography } from 'antd';

import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';

const { Title } = Typography;

const Incoming = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Sắp đến</Title>
            </Badge>

            {/* <JobList
                list={dummy}
                link={config.routes.staff.task}
                label={
                    <IncomingLabel>
                        <MdOutlinePermPhoneMsg size={16} color={theme.colors.white} />
                    </IncomingLabel>
                }
            /> */}
        </StaffSection>
    );
};

export default Incoming;
