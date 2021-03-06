import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import useinput from "../hooks/useinput";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 30px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useinput('');
    const [password, onChangePassword] = useinput('');
    // const [id, setId] = useState('');
    // const [password, setPassword] = useState('');

    // const onChangeId = useCallback((e) => {
    //     setId(e.target.value);
    // }, []);

    // const onChangePassword = useCallback((e) => {
    //     setPassword(e.target.value);
    // }, []);

    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }
    }, [logInError])

    const onSubmitForm = useCallback(() => {
        // antd에서는 preventDefault가 이미 적용되어있어서 안해줘도 됨
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
        // setIsLoggedIn(true);
    }, [email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
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
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm;