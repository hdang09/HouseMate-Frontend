import * as PropTypes from 'prop-types';
import * as St from './Link.styled';

type LinkType = { href?: string; to?: string; title?: string; children: any };

const Link = ({ href, to = '/', title, children }: LinkType) => {
    const Component: React.ComponentType<any> = href ? St.ExternalLink : St.InternalLink;
    return (
        <Component href={href} to={to} title={title}>
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
