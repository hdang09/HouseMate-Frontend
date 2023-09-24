import * as St from './Link.styled';

import PropTypes from 'prop-types';

type LinkType = { href?: string; to?: string; title?: string; children: any };

const Link = ({ href, to, title, children, ...rest }: LinkType) => {
    const Component: React.ComponentType<any> = href ? St.ExternalLink : St.InternalLink;
    return (
        <Component
            href={href}
            to={to}
            title={title}
            isText={typeof children === 'string'}
            {...rest}
        >
            {children}
        </Component>
    );
};

Link.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Link;
