import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {

    const { logInLoading, logInError } = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    useEffect(() => {
        if(logInError) {
            alert(logInError);
        }
    }, [logInError])


    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(logInRequestAction({email, password}))
    }, [email, password, dispatch]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user_email">이메일</label>
                <br />
                <Input 
                    name="user_email" 
                    value={email} 
                    onChange={onChangeEmail} 
                    required 
                    type="email"
                />
            </div>
            <div>
                <label htmlFor="user_password">비밀번호</label>
                <Input 
                    htmlFor="user_password" 
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
};

LoginForm.propTypes = {
};

export default LoginForm;
