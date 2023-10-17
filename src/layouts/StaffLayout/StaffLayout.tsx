import { Outlet } from 'react-router-dom';
import { BiUpArrowCircle } from 'react-icons/bi';
import { theme } from '@/themes';
import Header from './Header';
import Wrapper from './Wrapper';
import { BackTopButton } from './StaffLayout.styled';

const StaffLayout = () => {
    return (
        <>
            <Header />

            <main>
                <Wrapper>
                    <Outlet />
                    <BackTopButton
                        icon={<BiUpArrowCircle size={35} color={theme.colors.primary} />}
                    />
                </Wrapper>
            </main>
        </>
    );
};

export default StaffLayout;
