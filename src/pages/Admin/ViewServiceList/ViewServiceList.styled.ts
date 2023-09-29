import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const WebTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 40px;
        font-weight: 800;
        text-transform: uppercase;
    }
`;
