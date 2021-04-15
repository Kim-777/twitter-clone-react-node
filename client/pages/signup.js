import React, { useCallback, useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {Form, Input, Checkbox, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

const ErrorMessage = styled.div`
    color: pink;
`;

const Signup = () => {

    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector(state => state.user);

    useEffect(() => {
        if(me && me.id) {
            Router.replace('/');
        }
    }, [me && me.id])

    useEffect(() => {
        if (signUpDone) {
            Router.history('/');
        }   
    }, [signUpDone]);

    useEffect(() => {
        if(signUpError) {
            console.log(signUpError);
            alert(signUpError);
        }
    }, [signUpError]);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');


    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);



    const [termError, setTermError] = useState(false)
    const [term, setTerm] = useState(false);
    const onChangeTerm = useCallback(() => {
        setTerm(!term);
        setTermError(false);

    }, [])

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck) {
            return setPasswordError(true);
        }
        if(!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname},
        });
    }, [password, passwordCheck, term]);


    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input name="user-nickname" type="text" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                    {passwordError && <ErrorMessage> 비밀번호가 일치하지 않습니다. </ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>김예찬 말을 잘 들을 것을 동의합니다. </Checkbox>
                    {termError && <ErrorMessage> 약관에 동의하셔야 합니다. </ErrorMessage>}
                </div>
                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}> 가입하기 </Button>
                </div>
            </Form>
        </AppLayout>
    )
}

export default Signup;