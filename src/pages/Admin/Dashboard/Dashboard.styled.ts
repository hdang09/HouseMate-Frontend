import { theme } from '@/themes';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
export const ChartWrapper = styled.div`
    width: 712px;
    padding: 20px 20px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    margin-bottom: 30px;
    h3.ant-typography {
        margin-top: 12px;
    }
`;

export const PieChartWrapper = styled.div`
    width: 425px;
    margin-left: 30px;
    padding: 20px 20px;
    border-radius: 8px;
    background-color: ${theme.colors.white};
`;

export const Rate = styled.div`
    color: ${theme.colors.error};
`;

export const DashboardTitle = styled(Title)`
    &.ant-typography {
        font-weight: 500;
        font-size: 2.4rem;
        margin-bottom: 0;
    }
`;

export const ChartName = styled(Title)`
    &.ant-typography {
        font-weight: 500;
        font-size: 1.4rem;
        color: ${theme.colors.blue};
        margin-bottom: 0;
    }
`;

export const ChartDetail = styled(Title)`
    &.ant-typography {
        font-weight: 400;
        font-size: 2.4rem;
        margin-bottom: 0;
        margin-top: 0.8em;
    }
`;

export const LegendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-top: 50px;
`;

export const LegendList = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`;

export const LegendLabel = styled.div`
    width: 40px;
    height: 30px;
    margin-right: 5px;
`;

export const LegendContent = styled.div`
    display: flex;
    justify-content: space-between;
    width: 340px;
`;

export const LegendNumber = styled.div`
    display: flex;
    justify-content: space-between;
    width: 130px;
`;

export const Wrapper = styled.div`
    padding: 20px 20px;
    width: 100%;
    min-height: 400px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
`;

export const TopServiceHeader = styled.div`
    color: ${theme.colors.textSecondary};
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
`;

export const TopServiceContent = styled.div`
    color: ${theme.colors.textPrimary};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;
