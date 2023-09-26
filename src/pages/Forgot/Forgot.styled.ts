import { Typography } from 'antd';
import styled from 'styled-components';
import AuthForm from '@/components/AuthForm';
import { theme } from '@/themes';

const { Paragraph } = Typography;

export const AuthFormStyled = styled(AuthForm)`
    & h1.ant-typography {
        text-align: left;
    }

    & .ant-form-item:last-child {
        margin-top: 0;
    }
`;

export const ForgotDescWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-bottom: 24px;
`;

export const ForgotDesc = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textDark};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 1.73333;
    }
`;

export const ForgotText = styled(Paragraph)`
    &.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.textLight};
        font-size: 1.6rem;
        font-weight: 400;
        line-height: 2;
    }
`;
