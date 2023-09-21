import * as St from './Link.styled';

import PropTypes from 'prop-types';

type LinkType = { href: string; children: any };

const Link = ({ href, children }: LinkType) => {
    return <St.BaseLink href={href}>{children}</St.BaseLink>;
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

Link.defaultProps = {
    href: '/',
    children: '',
};

export default Link;
