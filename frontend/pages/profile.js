import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
    LOAD_MY_INFO_REQUEST,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
} from '../reducers/user';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const Profile = () => {

    const dispatch = useDispatch();

    const { me } = useSelector(({user}) => user);

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
        });

        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
        })
    }, [])

    useEffect(() => {

        if(!(me && me.id)) {
            Router.push('/');
        }

    }, [me && me.id])

    if(!me) {
        return null;
    }
    return (
        <>
            <Head>
                <title>프로필 | chaty</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={me && me.Followings} />
                <FollowList header="팔로워" data={me && me.Followers} />
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

export default Profile;
