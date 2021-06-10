import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
// import Proptypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { logOutRequestAction } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector(({user}) => user);
    const onLogOut = useCallback(() => {
        dispatch(logOutRequestAction());
    }, [dispatch])

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />{me.Posts.length}</div>,
                <div key="followings">팔로잉<br />{me.Followings.length}</div>,
                <div key="followers">팔로워<br />{me.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
};

UserProfile.propTypes = {
    // setIsLoggedIn: Proptypes.func.isRequired,
}

export default UserProfile;
