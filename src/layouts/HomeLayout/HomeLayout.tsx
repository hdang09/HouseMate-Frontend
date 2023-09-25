import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <>
            <header>
                <Header />
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default HomeLayout;
