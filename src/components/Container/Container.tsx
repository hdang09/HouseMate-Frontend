import { FC, PropsWithChildren } from 'react';

import { ContainerStyled } from './Container.styled';
import { useLocation } from 'react-router-dom';

// TODO: Fix hard code
const pattern = /^\/purchased\/[^/]+$/;

const Container: FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();
    const isWide = pattern.test(pathname);

    return <ContainerStyled $isWide={isWide}>{children}</ContainerStyled>;
};

export default Container;
