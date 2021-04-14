import React, {useCallback} from 'react'
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';
import { useSelector, useDispatch } from 'react-redux';

const FollowButton = ({ post }) => {

    const dispatch = useDispatch();
    const {me, followLoading, unfollowLoading} = useSelector(state => state.user);
    const isFollowing = me?.Followings.find(v => v.id === post.User.id);

    const onClickButton = useCallback(() => {

        if(isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }

    },[isFollowing])


    return <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
                {isFollowing ? 'unfollow' : 'follow'}
            </Button>
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
}

export default FollowButton
