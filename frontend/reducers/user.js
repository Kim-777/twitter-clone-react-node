import produce from "immer";

// 액션 타입
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
    me: null,
    signUpdata: {},
    loginData: {},
}

const dummyUser = (data) => ({
    ...data,
    nickname: '와빵',
    id: 1,
    Posts: [{id: "1"}],
    Followings: [{nickname: "어니"},{nickname: "두두"},{nickname: "루기"},],
    Followers: [{nickname: "어니"},{nickname: "두두"},{nickname: "루기"},],
})

// 리듀서
const user = ( state = initialState, action ) => produce(state, (draft) => {
    switch (action.type) {
        case FOLLOW_REQUEST :
            draft.followLoading = true;
            draft.followError = null;
            draft.followDone = false;
            break;
        case FOLLOW_SUCCESS :
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({id: action.data});
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
            draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
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
            draft.me = dummyUser(action.data);
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
            draft.changeNickNameLoading = false;
            draft.changeNickNameDone = true;
            break;
        case CHANGE_NICKNAME_FAILURE :
            draft.changeNickNameLoading = false;
            draft.changeNickNameError = action.error;
            break;
        case ADD_POST_TO_ME :
            draft.me.Posts.unshift({id: action.data});
            break;
        case REMOVE_POST_OF_ME:
            draft.me.Posts.splice(draft.me.Posts.findIndex(v => v.id === action.data), 1);
            break;
        default:
            break;
    }
})


export default user;