import { Typography } from 'antd';
import { SidebarProps } from './Sidebar.type';
import * as Styled from './Sidebar.styled';

const { Title } = Typography;

const Sidebar = ({ title, children }: SidebarProps) => {
    return (
        <Styled.SidebarContent>
            <Title level={2}>{title}</Title>

            {children}
        </Styled.SidebarContent>
    );
};

export default Sidebar;
