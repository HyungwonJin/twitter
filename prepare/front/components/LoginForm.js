import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import useinput from "../hooks/useinput";
import { loginAction } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 30px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useinput('');
    const [password, onChangePassword] = useinput('');
    // const [id, setId] = useState('');
    // const [password, setPassword] = useState('');

    // const onChangeId = useCallback((e) => {
    //     setId(e.target.value);
    // }, []);

    // const onChangePassword = useCallback((e) => {
    //     setPassword(e.target.value);
    // }, []);

    const onSubmitForm = useCallback(() => {
        // antd에서는 preventDefault가 이미 적용되어있어서 안해줘도 됨
        console.log(id, password);
        dispatch(loginAction({ id, password }));
        // setIsLoggedIn(true);
    }, [id, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm;