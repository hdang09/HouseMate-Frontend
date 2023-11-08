import { theme } from '@/themes';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
export const ChartWrapper = styled.div`
    width: 100%;
    padding: 20px 20px;
    background-color: ${theme.colors.white};
`;

export const Rate = styled.div`
    color: red;
`;

export const DashboardTitle = styled(Title)`
    &.ant-typography {
        font-size: 2.4rem;
        margin-bottom: 0;
    }
`;
