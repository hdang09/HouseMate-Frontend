import { LinkStyled } from './Link.styled';

type LinkProps = {
    className?: string;
    to: string;
    children: any;
    zoom?: boolean;
    underline?: boolean;
    scroll?: boolean;
};

const Link = ({
    to,
    className,
    children,
    zoom = false,
    underline = false,
    scroll = false,
    ...rest
}: LinkProps) => {
    return (
        <LinkStyled
            className={className}
            to={to}
            title={typeof children === 'string' ? children : ''}
            $zoom={zoom}
            $underline={underline}
            $scroll={scroll}
            {...rest}
        >
            {children}
        </LinkStyled>
    );
};

export default Link;
