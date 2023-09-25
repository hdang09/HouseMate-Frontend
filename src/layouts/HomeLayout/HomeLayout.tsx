import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default HomeLayout;
