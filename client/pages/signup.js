import React, { useCallback, useState } from 'react'
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {Form, Input } from 'antd';

const Signup = () => {

    const onSubmit = useCallback(
        () => {
            
        },
        [],
    )

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.current.value);
    }, []);

    const onChangeNickname = useCallback((e) => {
        setNickname(e.current.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.current.value);
    }, []);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.current.value);
    }, []);

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" value={passwordCheck} required onChange={onChangePasswordCheck} />
                </div>
            </Form>
        </AppLayout>
    )
}

export default Signup;