import styled from 'styled-components';
import { theme } from '@/themes';

export const DoneLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${theme.colors.done};
`;
