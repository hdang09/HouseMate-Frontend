import { theme } from '@/themes';
import { Form, Typography } from 'antd';
import styled from 'styled-components';

export const SettingForm = styled(Form)`
    .ant-row-space-between {
        margin-bottom: 24px;
    }
`;

const { Title, Text } = Typography;

export const PageTitle = styled(Title)`
    &.ant-typography {
        font-size: 2.4rem;
        color: ${theme.colors.primary};
        margin-bottom: 18px;
    }
`;
