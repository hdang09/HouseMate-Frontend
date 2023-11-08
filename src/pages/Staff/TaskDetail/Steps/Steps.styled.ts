import { Image, Steps } from 'antd';
import styled from 'styled-components';

export const StepsStyled = styled(Steps)`
    margin-top: 16px;

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
