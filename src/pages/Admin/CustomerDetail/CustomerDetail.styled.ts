import { Flex, Input } from 'antd';
import styled, { css } from 'styled-components';
import { theme } from '@/themes';

const { Password } = Input;

export const CustomerWrapper = styled.div`
    padding: 30px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    &:hover {
        box-shadow: 0px 4px 4px 0px ${theme.colors.disabledPlaceholder};
    }

    & .ant-row {
        width: 100%;
    }

    & h2.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const CustomerContent = styled(Flex)`
    & h1.ant-typography {
        margin-top: 12px;
        margin-bottom: 6px;
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }

    & > span.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.57143;
    }

    & .ant-avatar {
        border: 1px solid ${theme.colors.borderSchedule};
    }
`;

export const CustomerInfoItem = styled(Flex)`
    margin-top: 30px;
    width: 100%;

    & h3.ant-typography {
        margin-bottom: 0;
        color: ${theme.colors.primary};
        font-size: 1.8rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;

export const CustomerInfoText = css`
    color: ${theme.colors.textPrimary};
    font-size: 1.6rem;
    font-weight: 400;
`;

export const CustomerInfoBox = styled(Flex)`
    padding: 12px 20px;
    border-radius: 6px;
    border: 1px solid ${theme.colors.secondary};

    & span.ant-typography {
        ${CustomerInfoText}
        flex-shrink: 0;
    }

    & > .ant-flex span.ant-typography {
        margin-right: 4px;
        width: 150px;
    }

    & div.ant-typography {
        margin-bottom: 0;

        & span.ant-typography:first-child {
            margin-right: 4px;
            color: ${theme.colors.primary};
        }
    }
`;

export const CustomerIdentityCard = styled(Password)`
    &.ant-input-password {
        background-color: ${theme.colors.shadowButton};
        border-color: ${theme.colors.borderInput};
    }

    & input.ant-input {
        color: ${theme.colors.textQuaternary};
        background-color: transparent;
    }
`;
