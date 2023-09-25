import config from '@/config';

export type NavbarType = {
    label: string;
    key: string;
};

const navbar: NavbarType[] = [
    {
        label: 'Home',
        key: config.routes.home,
    },
    {
        label: 'Shop',
        key: config.routes.shop,
    },
    {
        label: 'My purchased',
        key: config.routes.purchased,
    },
];

export default navbar;
