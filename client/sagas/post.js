import { all, fork, put, delay, takeLatest } from "@redux-saga/core/effects";

// function addPostAPI(data) {
//     return axios.post('/api/post/add', data);
// }

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCESS',
            // data: result.data
        })
    } catch(err) {
        yield put({
            type: 'ADD_POST_FAILURE',
            // data: err.result.data
        })
    }
}


function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost, 3000);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost)
    ])
}