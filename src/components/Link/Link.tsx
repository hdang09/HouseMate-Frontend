import * as St from './Link.styled';

import PropTypes from 'prop-types';

type LinkType = { href?: string; to?: string; children: any };

const Link = ({ href, to = '/', children }: LinkType) => {
    if (href) {
        return <St.ExternalLink href={href}>{children}</St.ExternalLink>;
    }
    return <St.InternalLink to={to}>{children}</St.InternalLink>;
};

Link.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Link;
