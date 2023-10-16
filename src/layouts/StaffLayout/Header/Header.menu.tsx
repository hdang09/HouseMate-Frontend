import { MenuProps } from 'antd';
import { AiOutlineHome, AiOutlineNotification } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';

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
        config.routes.staff.newJob,
        <AiOutlineNotification size={20} color={theme.colors.textPrimary} />,
        'Công việc',
    ),
    createMenuItem(
        'Task',
        <BiTask size={20} color={theme.colors.textPrimary} />,
        'Task',
        [
            createMenuItem('1', <></>, 'Lịch trình làm việc'),
            createMenuItem('2', <></>, 'Danh sách công việc'),
        ],
        (e) => e.preventDefault(),
    ),
];

export default menu;
