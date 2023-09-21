import { ContainerStyled } from './Container.styled';

const Container = ({ children }: { children: any }) => {
    return <ContainerStyled>{children}</ContainerStyled>;
};

export default Container;
