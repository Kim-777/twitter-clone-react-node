import axios from 'axios';
import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    UNFOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE
} from '../reducers/user';


// function followAPI() {
//     return axios.post('/api/follow');
// }

// function unfollowAPI() {
//     return axios.post('/api/unfollow');
// }

function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadUser() {
    try {
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

function logInAPI(data) {
    return axios.post('/user/login', data)
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch(err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function signUpAPI(data) {
    return axios.post('/user', data)
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch(err) {
        console.log('err입니다.', err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
}

function* follow(action) {
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }
}

function* unfollow(action) {
    try {
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data : action.data
        })
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser)
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadMyInfo),
    ])
}