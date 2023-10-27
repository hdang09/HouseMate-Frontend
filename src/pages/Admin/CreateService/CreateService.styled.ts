import { theme } from '@/themes';
import { Form, Tag, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const PageTitle = styled(Title)`
    &.ant-typography {
        font-size: 2.4rem;
        color: ${theme.colors.primary};
        margin-bottom: 18px;
    }
`;

export const ServiceDetailForm = styled(Form)`
    display: flex;
    flex-direction: column;

    .ant-row {
        margin-bottom: 16px;
    }

    .ant-flex .ant-form-item-row {
        margin-bottom: 36px;
    }

    .ant-form-item-label span {
        display: flex;
        margin-left: 5px;
    }

    .ant-form-item-explain {
        position: absolute;
        font-size: 1.3rem;
        margin-top: 2px;
        width: 500px;
    }

    .ant-form-item-control-input-content span {
        margin-bottom: 0 !important;
    }

    .ant-form-item .ant-form-item-label {
        text-align: left;
    }
`;

export const PageText = styled(Text)``;

export const SaleTag = styled(Tag)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    color: ${theme.colors.primary};
    border-radius: 15px;
    border: 1px solid ${theme.colors.primary};

    span {
        font-size: 1.4rem;
        margin-right: 10px;
    }
`;

export const Picture = styled.div`
    margin-top: 32px;
`;
