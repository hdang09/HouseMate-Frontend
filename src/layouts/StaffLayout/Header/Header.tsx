import Wrapper from '@/layouts/StaffLayout/Wrapper';
import { HeaderInner, HeaderSection } from './Header.styled';
import Notify from '@/components/Notify';
import { notifications } from '@/layouts/MainLayout/notifications.dummy';

const Header = () => {
    return (
        <HeaderSection>
            <Wrapper>
                <HeaderInner>
                    <Notify items={notifications} />
                </HeaderInner>
            </Wrapper>
        </HeaderSection>
    );
};

export default Header;
