import React, { useCallback, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
import Head from 'next/head';
import useInput from '../hooks/useInput';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color: red;
`;

const Signup = () => {

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const onChangePasswordConfirm = useCallback(e => {
        setPasswordConfirm(e.target.value);
        setPasswordError(e.target.value !== password);
    });

    const onChangeTerm = useCallback(e => {

        const currentChecked = e.target.checked
        console.log('currentChecked : ', currentChecked)
        setTerm(currentChecked);
        setTermError(false);
    })

    const onSubmit = useCallback(() => {
        if(id=== '' || password === '') {
            return alert('필수 입력란을 꼭 입력해주세요.');
        }

        console.log("test");
        if (password !== passwordConfirm) {
            return setPasswordError(true);
        }

        if (!term) {
            return setTermError(true);
        }

        console.log(id, nickname, password);
    }, [password, passwordConfirm, term, nickname]);


    return (
        <>
            <Head>
                <title>회원가입 | chaty</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user_id">아이디</label>
                        <br />
                        <Input name="user_id" value={id} required onChange={onChangeId} />
                    </div>
                    <div>
                        <label htmlFor="user_nickname">닉네임</label>
                        <br />
                        <Input name="user_nickname" value={nickname} onChange={onChangeNickname} />
                    </div>
                    <div>
                        <label htmlFor="user_password">패스워드</label>
                        <br />
                        <Input name="user_password" type="password" value={password} onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="user_password_confirm">패스워드 확인</label>
                        <br />
                        <Input name="user_password_confirm" type="password" value={passwordConfirm} onChange={onChangePasswordConfirm} />
                    </div>
                    {passwordError && <ErrorMessage> 비밀번호가 일치하지 않습니다.</ErrorMessage>}
                    <Checkbox name="user_term" checked={term} onChange={onChangeTerm}>와빵의 말을 잘 들을 것을 동의합니다.</Checkbox>
                    {termError && <ErrorMessage> 약관에 동의하셔야 합니다.</ErrorMessage>}
                    <div style={{ marginTop: 10}}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;
