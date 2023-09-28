import { LinkEnum } from '@/utils/enums';
import { LinkStyled, NavLinkStyled } from './Link.styled';

type LinkType = {
    type?: LinkEnum;
    className?: string;
    to: string;
    children: any;
    zoom?: boolean;
    underline?: boolean;
    scroll?: boolean;
};

const Link = ({
    type = LinkEnum.LINK,
    to,
    className,
    children,
    zoom = false,
    underline = false,
    scroll = false,
}: LinkType) => {
    const Component: React.ElementType = type === LinkEnum.NAV_LINK ? NavLinkStyled : LinkStyled;

    return (
        <Component
            className={className}
            to={to}
            title={typeof children === 'string' ? children : ''}
            $zoom={zoom}
            $underline={underline}
            $scroll={scroll}
        >
            {children}
        </Component>
    );
};

export default Link;
