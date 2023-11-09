import { List as ListAntd, Typography } from 'antd';

import styled from 'styled-components';
import { theme } from '@/themes';

export const Title = styled(Typography.Title)`
    &.ant-typography {
        color: ${theme.colors.primary};
        font-size: 2.4rem;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-top: 24px;
    }
`;

export const Section = styled.div`
    margin-top: 16px;
`;

export const TitleList = styled(Typography.Title)`
    &.ant-typography {
        color: ${theme.colors.secondary};
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
    }
`;

export const List = styled(ListAntd)``;

export const Item = styled(ListAntd.Item)`
    &.ant-list-item,
    &.ant-typography {
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        padding: 4px;
    }

    strong {
        font-size: 1.2rem;
    }
`;

export const CalendarWrapper = styled.div`
    max-width: 768px;
    overflow: auto;
`;
