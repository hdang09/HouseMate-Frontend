import { theme } from '@/themes';
import { Form, Table, Typography } from 'antd';
import styled from 'styled-components';

export const SettingForm = styled(Form)`
    .ant-row-space-between {
        margin-bottom: 24px;
    }
`;

const { Title } = Typography;

export const PageTitle = styled(Title)`
    &.ant-typography {
        font-size: 2.4rem;
        color: ${theme.colors.primary};
        margin-bottom: 18px;
    }
`;

export const Container = styled.div`
    padding: 24px;
    min-height: 80vh;
    border-radius: 8px;
    background-color: ${theme.colors.white};
`;

export const PriceConfigTable = styled(Table)`
    flex: 1;
    border-radius: 8px;
    background-color: ${theme.colors.white};
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
`;

export const ConfigForm = styled(Form)`
    & .ant-form-item-label label {
        width: 120px;
    }
`;
