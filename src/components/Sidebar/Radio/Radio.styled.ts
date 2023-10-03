import styled from 'styled-components';
import { theme } from '@/themes';

export const RatingContent = styled.div`
    & span.ant-typography {
        color: ${theme.colors.black};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.875;
    }

    & .ant-space-item:first-child span.ant-typography {
        display: block;
        min-width: 12px;
    }

    & svg {
        color: ${theme.colors.starIcon};
    }
`;
