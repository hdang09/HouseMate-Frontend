import { FC, PropsWithChildren } from 'react';
import { WrapperStyled } from './Wrapper.styled';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <WrapperStyled>{children}</WrapperStyled>;
};

export default Wrapper;
