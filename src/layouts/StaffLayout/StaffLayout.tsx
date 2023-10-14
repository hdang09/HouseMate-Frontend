import { Outlet } from 'react-router-dom';
import Header from './Header';
import Wrapper from './Wrapper';

const StaffLayout = () => {
    return (
        <>
            <Header />

            <main>
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </main>
        </>
    );
};

export default StaffLayout;
