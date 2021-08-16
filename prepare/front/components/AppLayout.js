import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>Home</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>Profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle ' }} />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>Signup</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>

                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/HyungwonJin" target="_blank" rel="noreferrer noopener">Github</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.PropTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;