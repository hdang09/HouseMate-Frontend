import { Image, Steps, Typography } from 'antd';
import styled from 'styled-components';
import { theme } from '@/themes';

const { Title } = Typography;

export const StepsReportText = styled(Title)`
    &.ant-typography {
        color: ${theme.colors.textPrimary};
        font-size: 1.6rem;
        font-weight: 500;
    }
`;

export const StepsStyled = styled(Steps)`
    & .ant-btn {
        margin-left: 4px;
        border-radius: 4px;
    }
`;

export const ImageSteps = styled(Image)`
    display: block;
    border-radius: 4px;
    object-fit: cover;
`;
