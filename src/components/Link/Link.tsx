import { LinkEnum } from '@/utils/enums';
import { LinkStyled, NavLinkStyled } from './Link.styled';

type LinkType = {
    type?: LinkEnum;
    className?: string;
    to: string;
    target?: string;
    children: any;
    zoom?: boolean;
    underline?: boolean;
    scroll?: boolean;
};

const Link = ({
    type = LinkEnum.LINK,
    to,
    target = '_self',
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
            target={target}
        >
            {children}
        </Component>
    );
};

export default Link;
