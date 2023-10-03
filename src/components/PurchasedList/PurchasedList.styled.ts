import { List } from 'antd';
import styled from 'styled-components';

export const PurchasedItemStyled = styled(List.Item)`
    &.ant-list-item {
        padding: 16px 0;
    }

    &.ant-list-item:last-child {
        margin-bottom: 72px;
    }
`;
