import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {

    const followerList = [{nickname: '와빵'}, {nickname: '바보'}, {nickname: '멍멍'}];
    const followingList = [{nickname: '야미'}, {nickname: '호호'}, {nickname: '불면'}];

    return (
        <>
            <Head>
                <title>프로필 | chaty</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉 목록" data={followingList} />
                <FollowList header="팔로워 목록" data={followerList} />
            </AppLayout>
        </>
    )
};

export default Profile;
