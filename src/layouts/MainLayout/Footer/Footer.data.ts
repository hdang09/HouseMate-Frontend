import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';

import { BiLogoFacebook } from 'react-icons/bi';
import { IconType } from 'react-icons';
import config from '@/config';

type DataType = {
    key: number;
    title?: string;
    to: string;
    target?: string;
    icon?: IconType | undefined;
    label?: string;
};

export const services: DataType[] = [
    {
        key: 1,
        title: 'Cleaning house',
        to: config.routes.public.home,
    },
    {
        key: 2,
        title: 'Laundry',
        to: config.routes.public.home,
    },
    {
        key: 3,
        title: 'Water delivery',
        to: config.routes.public.home,
    },
    {
        key: 4,
        title: 'Rice delivery',
        to: config.routes.public.home,
    },
];

export const pages: DataType[] = [
    {
        key: 1,
        title: 'Home',
        to: config.routes.public.home,
    },
    {
        key: 2,
        title: 'Shop',
        to: config.routes.public.shop,
    },
    {
        key: 3,
        title: 'My purchased',
        to: config.routes.customer.purchased,
    },
];

export const aboutUs: DataType[] = [
    {
        key: 1,
        title: 'Phone Number: 0916207758',
        to: 'tel:0916207758',
    },
    {
        key: 2,
        title: 'Email: housemate@gmail.com',
        to: 'mailto:housemate@gmail.com',
    },
    {
        key: 3,
        title: 'Address: VRG2+27X, Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương, Việt Nam',
        to: 'https://maps.app.goo.gl/2gbJxFdCckC1ng9D6',
        target: '_blank',
    },
];

export const socials: DataType[] = [
    {
        key: 1,
        icon: BiLogoFacebook,
        to: config.routes.public.home,
        label: 'Facebook',
    },
    {
        key: 2,
        icon: AiOutlineTwitter,
        to: config.routes.public.home,
        label: 'Twitter',
    },
    {
        key: 3,
        icon: AiOutlineInstagram,
        to: config.routes.public.home,
        label: 'Instagram',
    },
];
