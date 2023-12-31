import styled from 'styled-components';
import { theme } from '@/themes';

export const IncomingLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
`;
