import styled from 'styled-components';

import Link from '@/components/Link';
import { theme } from '@/themes';

export const LogoWrapper = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & .ant-typography {
        font-size: 2.4rem;
        font-weight: 700;
    }

    & .ant-typography:last-child,
    & .ant-typography:first-child {
        color: ${theme.colors.primary};
    }

    & .ant-typography:nth-child(2) {
        color: ${theme.colors.secondary};
    }
`;
