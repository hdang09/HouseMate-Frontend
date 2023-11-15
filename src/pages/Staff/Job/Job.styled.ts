import styled from 'styled-components';
import { theme } from '@/themes';

export const JobWrapper = styled.div`
    padding-top: 24px;
`;

export const NewLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-size: 0.9rem;
`;
