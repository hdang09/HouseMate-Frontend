import { Avatar as AvatarAntd, Badge as BadgeAntd, Button, Layout as LayoutAntd } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

const { Header: HeaderAntd } = LayoutAntd;

export const Header = styled(HeaderAntd)`
    padding: 0;
    background-color: ${theme.colors.white};
    display: flex;
    align-items: center;
`;

export const CollapseBtn = styled(Button)`
    font-size: 1.6rem;
`;

export const RightContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Badge = styled(BadgeAntd)`
    margin: 0 24px;
    font-size: 2rem;
    cursor: pointer;
`;

export const Avatar = styled(AvatarAntd)`
    margin-right: 6px;
`;
