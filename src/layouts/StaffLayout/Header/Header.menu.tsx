import { MenuProps } from 'antd';
import { AiOutlineHome, AiOutlineNotification } from 'react-icons/ai';

import Link from '@/components/Link';
import config from '@/config';
import { theme } from '@/themes';

type MenuItem = Required<MenuProps>['items'][number];

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon?: JSX.Element,
    title?: string,
    children?: MenuItem[],
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    type?: 'group',
): MenuItem =>
    ({
        key: key,
        label: (
            <Link to={key} onClick={onClick}>
                {icon}
                {title}
            </Link>
        ),
        children,
        type,
    } as MenuItem);

const menu = [
    createMenuItem(
        config.routes.staff.profile,
        <AiOutlineHome size={20} color={theme.colors.textPrimary} />,
        'Hồ sơ',
    ),
    createMenuItem(
        'Thông báo',
        <AiOutlineNotification size={20} color={theme.colors.textPrimary} />,
        'Thông báo',
        [createMenuItem(config.routes.staff.newJob, <></>, 'Công việc')],
        (e) => e.preventDefault(),
    ),
];

export default menu;
