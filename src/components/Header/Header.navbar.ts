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
        to: config.routes.home,
    },
    {
        key: 2,
        label: 'Shop',
        to: config.routes.shop,
    },
    {
        key: 3,
        label: 'My purchased',
        to: config.routes.purchased,
    },
];

export default navbar;
