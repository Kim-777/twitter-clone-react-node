import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
// import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();

    const onLogOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch])

    return (
        <Card
            actions={[
                <div key="twit">짹짹<br />0</div>,
                <div key="followings">팔로잉<br />0</div>,
                <div key="followers">팔로워<br />0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>ZC</Avatar>}
                title="wabbang"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    )
};

UserProfile.propTypes = {
    // setIsLoggedIn: Proptypes.func.isRequired,
}

export default UserProfile;
