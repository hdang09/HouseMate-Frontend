import { Outlet } from 'react-router-dom';

import userImage from '@/assets/images/user-img.jpg';
import Header from '@/components/Header';
import { menuLogged, menuUnLogged, navbar } from '@/components/Header/Header.customer';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks';

import { notifications } from './notifications.dummy';

const HomeLayout = () => {
    const { role } = useAuth();

    const user = {
        avatar: userImage,
        fullName: 'Lam Thi Ngoc Han',
    };

    const menu = role ? menuLogged(user) : menuUnLogged();

    return (
        <>
            <Header
                role={role}
                navbar={navbar}
                menu={menu}
                notifications={notifications}
                cartItems={5}
                avatar={user.avatar}
            />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default HomeLayout;
