import React, { useCallback, useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';
import Head from 'next/head';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';
import {
    LOAD_MY_INFO_REQUEST,
} from '../reducers/user';



const ErrorMessage = styled.div`
    color: red;
`;

const Signup = () => {

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordError, setPasswordError] = useState(false);
    const { signUpLoading, signUpDone, signUpError, me } = useSelector(({user}) => user)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(me && me.id) {
            Router.replace('/')
        }
    }, [me && me.id])

    useEffect(() => {
        if(signUpDone) {
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if(signUpError) {
            alert(signUpError);
        }
    }, [signUpError])
    
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const onChangePasswordConfirm = useCallback(e => {
        setPasswordConfirm(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);
    
    
    const [termError, setTermError] = useState(false)
    const [term, setTerm] = useState('');
    const onChangeTerm = useCallback(e => {
        const currentChecked = e.target.checked
        // console.log('currentChecked : ', currentChecked)
        setTerm(currentChecked);
        setTermError(false);
    })

    const onSubmit = useCallback(() => {
        if(email=== '' || password === '') {
            return alert('필수 입력란을 꼭 입력해주세요.');
        }

        // console.log("test");
        if (password !== passwordConfirm) {
            return setPasswordError(true);
        }

        if (!term) {
            return setTermError(true);
        }

        console.log(email, nickname, password);

        dispatch({
            type: SIGN_UP_REQUEST,
            data : { email, password, nickname }
        })
        
    }, [password, passwordConfirm, term, nickname]);


    return (
        <>
            <Head>
                <title>회원가입 | chaty</title>
            </Head>
            <AppLayout>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user_email">이메일</label>
                        <br />
                        <Input name="user_email" type="email" value={email} required onChange={onChangeEmail} />
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
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Signup;
