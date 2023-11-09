import { notification } from 'antd';
import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { PIIProps } from '@/layouts/MainLayout/Header/Header.type';
import Header from '@/layouts/MainLayout/Header';
import { menuLogged, menuUnLogged, navbar } from '@/layouts/MainLayout/Header/Header.customer';
import Footer from '@/layouts/MainLayout/Footer';
import { CartType } from '@/pages/Customer/Cart/Cart.type';
import { getCart } from '@/utils/cartAPI';
import { Role } from '@/utils/enums';

import { notifications } from './notifications.dummy';
import { cartSlice } from './slice';

const HomeLayout = () => {
    const dispatch = useAppDispatch();
    const cartLength = useAppSelector((state) => state.cart.cartLength);
    const { role, user } = useAuth();

    // Show toast
    const [api, contextHolder] = notification.useNotification({
        top: 100,
    });

    const menu = role ? menuLogged(user as PIIProps) : menuUnLogged();

    // Call api to get cart list
    const getCartLength = useCallback(async () => {
        try {
            if (role !== Role.CUSTOMER) return;
            const { data }: { data: CartType[] } = await getCart();
            dispatch(cartSlice.actions.setLength(data.length));
        } catch (error: any) {
            api.error({
                message: 'Lỗi',
                description: error.response ? error.response.data : error.message,
            });
        }
    }, []);

    useEffect(() => {
        getCartLength();
    }, []);

    return (
        <>
            {contextHolder}

            <Header
                role={role}
                navbar={navbar}
                menu={menu}
                notifications={notifications}
                cartItems={cartLength}
                avatar={user?.avatar}
            />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default HomeLayout;
