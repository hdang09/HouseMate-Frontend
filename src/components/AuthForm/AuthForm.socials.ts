import { BsFacebook, BsApple } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { CSSProperties } from 'styled-components';

import { theme } from '@/themes';

type SocialType = {
    key: number;
    href: string;
    icon: typeof BsFacebook | typeof BsApple | typeof FcGoogle;
    style: CSSProperties;
};

const socials: SocialType[] = [
    {
        key: 1,
        href: '/',
        icon: FcGoogle,
        style: {
            fontSize: '4.4rem',
            color: 'unset',
        },
    },
    {
        key: 2,
        href: '/',
        icon: BsFacebook,
        style: {
            fontSize: '4.4rem',
            color: theme.colors.facebook,
        },
    },
    {
        key: 3,
        href: '/',
        icon: BsApple,
        style: {
            fontSize: '4.4rem',
            color: theme.colors.black,
        },
    },
];

export default socials;
