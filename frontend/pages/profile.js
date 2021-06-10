import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {

    const { me } = useSelector(({user}) => user);

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

export default Profile;
