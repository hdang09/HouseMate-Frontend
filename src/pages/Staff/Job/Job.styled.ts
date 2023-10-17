import { Tabs } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

export const JobTabs = styled(Tabs)`
    margin-bottom: 50px;

    & .ant-tabs-nav {
        margin-bottom: 30px;

        &::before {
            border-color: transparent;
        }

        & .ant-tabs-tab-btn {
            font-size: 1.1rem;
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

    & .ant-badge-count {
        color: ${theme.colors.white};
        text-align: center;
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.66667;
    }
`;
