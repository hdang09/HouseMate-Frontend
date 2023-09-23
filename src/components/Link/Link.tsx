import * as St from './Link.styled';

import PropTypes from 'prop-types';

type LinkType = { href?: string; to?: string; title?: string; children: any };

const Link = ({ href, to = '/', title, children }: LinkType) => {
    return href ? (
        <St.ExternalLink href={href} title={title}>
            {children}
        </St.ExternalLink>
    ) : (
        <St.InternalLink to={to} title={title}>
            {children}
        </St.InternalLink>
    );
};

Link.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Link;
