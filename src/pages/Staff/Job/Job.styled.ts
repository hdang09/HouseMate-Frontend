import { Tabs } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

export const JobTabs = styled(Tabs)`
    & .ant-tabs-nav {
        margin-bottom: 30px;

        &::before {
            border-color: transparent;
        }
    }
`;

export const JobSection = styled.section`
    & h1.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.33333;
    }
`;
