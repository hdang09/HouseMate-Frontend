import { Flex } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

export const ImgWrapper = styled(Flex)`
    width: 280px;
    padding: 25px 42px 50px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    &:hover {
        box-shadow: 0px 4px 4px 0px ${theme.colors.disabledPlaceholder};
    }

    & .ant-upload-wrapper {
        text-align: center;
    }

    & .ant-upload-wrapper .ant-upload.ant-upload-select {
        margin: 0;
    }

    & h1.ant-typography {
        margin-top: 12px;
        margin-bottom: 0;
        color: ${theme.colors.textPrimary};
        text-align: center;
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 1.5;
        white-space: pre-wrap;
    }
`;

export const Actions = styled(Flex)`
    width: 100%;
    margin-top: 24px;

    & .ant-btn {
        border-radius: 2px;
    }
`;

export const StaffInfoWrapper = styled(Flex)`
    padding: 25px 40px;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    box-shadow: 0px 17px 55px 0px ${theme.colors.shadowCart};
    transition: ${theme.transition.primary};

    &:hover {
        box-shadow: 0px 4px 4px 0px ${theme.colors.disabledPlaceholder};
    }

    & h2.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
    }
`;
