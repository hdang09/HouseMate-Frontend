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

export const pages: DataType[] = [
    {
        key: 1,
        title: 'Trang chủ',
        to: config.routes.public.home,
    },
    {
        key: 2,
        title: 'Cửa hàng',
        to: config.routes.public.shop,
    },
    {
        key: 3,
        title: 'Dịch vụ của tôi',
        to: config.routes.customer.purchased,
    },
    {
        key: 4,
        title: 'Lịch sử dụng',
        to: config.routes.customer.schedule,
    },
];

export const aboutUs: DataType[] = [
    {
        key: 1,
        title: 'Số điện thoại: 0916207758',
        to: 'tel:0916207758',
    },
    {
        key: 2,
        title: 'Email: housemate@gmail.com',
        to: 'mailto:housemate@gmail.com',
    },
    {
        key: 3,
        title: 'Địa chỉ: VRG2+27X, Luu Huu Phuoc, Dong Hoa, Di An, Binh Duong, Viet Nam',
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
