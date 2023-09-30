import config from '@/config';

export type NavbarType = {
    key: number;
    label: string;
    to: string;
};

const navbar: NavbarType[] = [
    {
        key: 1,
        label: 'Home',
        to: config.routes.public.home,
    },
    {
        key: 2,
        label: 'Shop',
        to: config.routes.public.shop,
    },
    {
        key: 3,
        label: 'My purchased',
        to: config.routes.customer.purchased,
    },
];

export default navbar;
