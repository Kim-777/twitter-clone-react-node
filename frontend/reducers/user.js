import produce from "immer";

// 액션 타입

export const LOAD_MY_INFO_REQUEST = 'user/LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'user/LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'user/LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'user/LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'user/LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'user/LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'user/LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'user/LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'user/LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'user/LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'user/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'user/SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'user/CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'user/CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'user/CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'user/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'user/FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'user/FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'user/UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'user/UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'user/UNFOLLOW_FAILURE';


export const REMOVE_FOLLOWER_REQUEST = 'user/REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'user/REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'user/REMOVE_FOLLOWER_FAILURE';


export const LOAD_FOLLOWERS_REQUEST = 'user/LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'user/LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'user/LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'user/LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'user/LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'user/LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'user/ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'user/REMOVE_POST_OF_ME';

// 액션 생성 함수
export const logInRequestAction = ({ email, password }) => ({
    type: LOG_IN_REQUEST,
    data: {
        email,
        password
    }
});

export const logOutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
});

export const signUpRequestAction = ({id, password}) => ({
    type: SIGN_UP_REQUEST,
    data: {
        id,
        password
    }
})

// 이니셜 스테이트
const initialState = {
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loadUserLoading: false,
    loadUserDone: false,
    loadUserError: null,
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    changeNickNameLoading: false,    
    changeNickNameDone: false,
    changeNickNameError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,
    me: null,
    userInfo: null,
}


// 리듀서
const user = ( state = initialState, action ) => produce(state, (draft) => {
    switch (action.type) {
        case LOAD_MY_INFO_REQUEST :
            draft.loadMyInfoLoading = true;
            draft.loadMyInfoError = null;
            draft.loadMyInfoDone = false;
            break;
        case LOAD_MY_INFO_SUCCESS :
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoDone = true;
            draft.me = action.data;
            break;
        case LOAD_MY_INFO_FAILURE : 
            draft.loadMyInfoLoading = false;
            draft.loadMyInfoError = action.error;
            break;
        case LOAD_USER_REQUEST :
            draft.loadUserLoading = true;
            draft.loadUserError = null;
            draft.loadUserDone = false;
            break;
        case LOAD_USER_SUCCESS :
            draft.loadUserLoading = false;
            draft.loadUserDone = true;
            draft.userInfo = action.data;
            break;
        case LOAD_USER_FAILURE : 
            draft.loadUserLoading = false;
            draft.loadUserError = action.error;
            break;
        case FOLLOW_REQUEST :
            draft.followLoading = true;
            draft.followError = null;
            draft.followDone = false;
            break;
        case FOLLOW_SUCCESS :
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({id: action.data.UserId});
            break;
        case FOLLOW_FAILURE : 
            draft.followLoading = false;
            draft.followError = action.error;
            break;
        case UNFOLLOW_REQUEST :
            draft.unfollowLoading = true;
            draft.unfollowError = null;
            draft.unfollowDone = false;
            break;
        case UNFOLLOW_SUCCESS :
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
            break;
        case UNFOLLOW_FAILURE : 
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
        case LOG_IN_REQUEST :
            draft.logInLoading = true;
            draft.logInError = null;
            draft.logInDone = false;
            break;
        case LOG_IN_SUCCESS :
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.me = action.data;
            break;
        case LOG_IN_FAILURE : 
            draft.logInLoading = false;
            draft.logInError = action.error;
            break;
        case LOG_OUT_REQUEST :
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = null;
            break;
        case LOG_OUT_SUCCESS :
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.me = null;
            break;
        case LOG_OUT_FAILURE :
            draft.logOutLoading = false;
            draft.logOUtError = action.error;
            break;
        case SIGN_UP_REQUEST :
            draft.signUpLoading = true;
            draft.signUpDone = false;
            draft.signUpError = false;
            break;
        case SIGN_UP_SUCCESS :
            draft.signUpLoading = false;
            draft.signUpDone = true;
            break
        case SIGN_UP_FAILURE :
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        case CHANGE_NICKNAME_REQUEST :
            draft.changeNickNameLoading = true;
            draft.changeNickNameDone = false;
            draft.changeNickNameError = null;
            break;
        case CHANGE_NICKNAME_SUCCESS :
            draft.me.nickname = action.data.nickname;
            draft.changeNickNameLoading = false;
            draft.changeNickNameDone = true;
            break;
        case CHANGE_NICKNAME_FAILURE :
            draft.changeNickNameLoading = false;
            draft.changeNickNameError = action.error;
            break;
        case LOAD_FOLLOWERS_REQUEST :
            draft.loadFollowersLoading = true;
            draft.loadFollowersDone = false;
            draft.loadFollowersError = null;
            break;
        case LOAD_FOLLOWERS_SUCCESS :
            draft.me.Followers = action.data;
            draft.loadFollowersLoading = false;
            draft.loadFollowersDone = true;
            break;
        case LOAD_FOLLOWERS_FAILURE :
            draft.loadFollowersLoading = false;
            draft.loadFollowersError = action.error;
            break;
        case LOAD_FOLLOWINGS_REQUEST :
            draft.loadFollowingsLoading = true;
            draft.loadFollowingsDone = false;
            draft.loadFollowingsError = null;
            break;
        case LOAD_FOLLOWINGS_SUCCESS :
            draft.me.Followings = action.data;
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsDone = true;
            break;
        case LOAD_FOLLOWINGS_FAILURE :
            draft.loadFollowingsLoading = false;
            draft.loadFollowingsError = action.error;
            break;
        case REMOVE_FOLLOWER_REQUEST :
            draft.removeFollowerLoading = true;
            draft.removeFollowerDone = false;
            draft.removeFollowerError = null;
            break;
        case REMOVE_FOLLOWER_SUCCESS :
            draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
            draft.removeFollowerLoading = false;
            draft.removeFollowerDone = true;
            break;
        case REMOVE_FOLLOWER_FAILURE :
            draft.removeFollowerLoading = false;
            draft.removeFollowerError = action.error;
            break;
        case ADD_POST_TO_ME :
            draft.me.Posts.unshift({id: action.data});
            break;
        case REMOVE_POST_OF_ME:
            draft.me.Posts.splice(draft.me.Posts.findIndex(v => v.id === action.data.PostId), 1);
            break;
        default:
            break;
    }
})


export default user;