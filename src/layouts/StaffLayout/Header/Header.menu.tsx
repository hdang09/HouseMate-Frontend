import { AiOutlineLogout, AiOutlineNotification, AiOutlineUser } from 'react-icons/ai';

import { BiTask } from 'react-icons/bi';
import Link from '@/components/Link';
import { MenuProps } from 'antd';
import config from '@/config';
import cookieUtils from '@/utils/cookieUtils';
import { theme } from '@/themes';

type MenuItem = Required<MenuProps>['items'][number];

/* ==================== Menu ==================== */
const createMenuItem = (
    key: string,
    icon?: JSX.Element,
    title?: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    children?: MenuItem[],
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

const handleLogout = () => cookieUtils.clear();

const menu = [
    createMenuItem(
        config.routes.staff.profile,
        <AiOutlineUser size={20} color={theme.colors.textPrimary} />,
        'Hồ sơ',
    ),
    createMenuItem(
        config.routes.staff.job,
        <AiOutlineNotification size={20} color={theme.colors.textPrimary} />,
        'Tìm việc',
    ),
    createMenuItem(
        'Task',
        <BiTask size={20} color={theme.colors.textPrimary} />,
        'Công việc',
        (e) => e.preventDefault(),
        [
            createMenuItem(config.routes.staff.schedule, <></>, 'Lịch trình làm việc'),
            createMenuItem(config.routes.staff.task, <></>, 'Danh sách công việc'),
        ],
    ),
    createMenuItem(
        config.routes.public.login,
        <AiOutlineLogout size={20} color={theme.colors.textPrimary} />,
        'Đăng xuất',
        handleLogout,
    ),
];

export default menu;
