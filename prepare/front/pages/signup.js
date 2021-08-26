import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from "antd";
import styled from 'styled-components';

import AppLayout from "../components/AppLayout";
import useinput from '../hooks/useinput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const ErrorMessage = styled.div`
    color: red;
`;

const SignUp = () => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useinput('')
    const [nickname, onChangeNickname] = useinput('');
    const [password, onChangePassword] = useinput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password],
    );
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback(
        (e) => {
            setTerm(e.target.checked);
            setTermError(false);
        },
        [],
    )

    const onSubmit = useCallback(
        () => {
            if (password !== passwordCheck) {
                return setPasswordError(true);
            }
            if (!term) {
                return setTermError(true);
            }
            console.log(email, nickname, password);
            dispatchEvent({
                type: SIGN_UP_REQUEST,
                data: { email, password, nickname },
            })
        },
        [password, passwordCheck, term],
    )

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | Twitter</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input name="user-nickname" value={nickname} onChange={onChangeNickname} required />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                        required
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
                        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </div>
            </Form>
        </AppLayout>
    )
}

export default SignUp;