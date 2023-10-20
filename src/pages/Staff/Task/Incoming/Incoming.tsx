import { Badge, Typography } from 'antd';
import { MdOutlinePermPhoneMsg } from 'react-icons/md';

import JobList from '@/components/JobList';
import { StaffSection } from '@/layouts/StaffLayout/StaffLayout.styled';
import { theme } from '@/themes';

import { dummy } from './Incoming.dummy';
import { IncomingLabel } from './Incoming.styled';

const { Title } = Typography;

const Incoming = () => {
    return (
        <StaffSection>
            <Badge count={21} overflowCount={20} offset={[31, 13]}>
                <Title level={1}>Sắp đến</Title>
            </Badge>

            <JobList
                list={dummy}
                label={
                    <IncomingLabel>
                        <MdOutlinePermPhoneMsg size={16} color={theme.colors.white} />
                    </IncomingLabel>
                }
            />
        </StaffSection>
    );
};

export default Incoming;
