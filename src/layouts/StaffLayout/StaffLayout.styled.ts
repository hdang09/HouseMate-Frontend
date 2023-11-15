import { FloatButton, Tabs } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

const { BackTop } = FloatButton;

export const BackTopButton = styled(BackTop)`
    width: 35px;
    height: 35px;

    & .ant-float-btn-body .ant-float-btn-content {
        padding: 0;

        & .ant-float-btn-icon {
            width: 35px;
            height: 35px;
        }
    }
`;

export const StaffTabs = styled(Tabs)`
    padding-bottom: 100px;
`;

export const StaffSection = styled.section`
    & h1.ant-typography {
        margin: 0;
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
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
