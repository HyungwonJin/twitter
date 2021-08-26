/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);
    // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    // isLoggedIn 값이 바뀌면 아랫가 리랜더링 됨
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
                    <SearchInput />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>Signup</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
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

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;