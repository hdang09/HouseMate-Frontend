import * as Styled from './AdminLayout.styled';

import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Row, Typography } from 'antd';

import Container from '@/components/Container';

const { Text } = Typography;

type HeaderProps = {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ collapsed, setCollapsed }: HeaderProps) => {
    return (
        <Styled.Header>
            <Container>
                <Row justify="space-between" align="middle">
                    <Styled.CollapseBtn
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />

                    <Styled.RightContent>
                        <Styled.Badge count={5}>
                            <BellOutlined />
                        </Styled.Badge>

                        <Styled.Avatar src="https://wegotthiscovered.com/wp-content/uploads/2023/07/Happy-Independence-Day-5.png?w=1200" />
                        <Text strong>Administrator</Text>
                    </Styled.RightContent>
                </Row>
            </Container>
        </Styled.Header>
    );
};

Header.propTypes = {};

export default Header;
