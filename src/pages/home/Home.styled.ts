import styled from 'styled-components';

export const Main = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    padding: 2em;
    display: flex;
    flex-direction: column;

    button {
        font-size: 1em;
        margin: auto;
    }
`;
