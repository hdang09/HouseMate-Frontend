import { FloatButton } from 'antd';
import styled from 'styled-components';

const { BackTop } = FloatButton;

export const BackTopButton = styled(BackTop)`
    width: 35px;
    height: 35px;

    & .ant-float-btn-body .ant-float-btn-content {
        padding: 0;

        & .ant-float-btn-icon {
            width: 35px;
            height: 35px;
        }
    }
`;
