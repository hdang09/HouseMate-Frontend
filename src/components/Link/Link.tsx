import { LinkStyled } from './Link.styled';

export type LinkType = {
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
}: LinkType) => {
    return (
        <LinkStyled
            className={className}
            to={to}
            title={typeof children === 'string' ? children : ''}
            $zoom={zoom}
            $underline={underline}
            $scroll={scroll}
        >
            {children}
        </LinkStyled>
    );
};

export default Link;
