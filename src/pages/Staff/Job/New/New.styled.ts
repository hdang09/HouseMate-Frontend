import styled from 'styled-components';
import { theme } from '@/themes';

export const NewLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 25px;
    height: 25px;
    color: ${theme.colors.white};
    font-size: 0.7rem;
    font-weight: 600;
    border-radius: 50%;
    line-height: 2.14795;
    background-color: ${theme.colors.primary};
`;
