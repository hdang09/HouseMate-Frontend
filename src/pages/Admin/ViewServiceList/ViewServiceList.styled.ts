import { Space, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const ServiceWrapper = styled(Space)`
    & .ant-row {
        justify-content: center;
    }
`;

export const WebTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 40px;
        font-weight: 800;
        text-transform: uppercase;
    }
`;
