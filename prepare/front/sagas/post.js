import { all, fork, takeLatest, delay, put } from "redux-saga/effects";

function addPostAPI(data) { // 제네레이터 아님
    return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'Add_POST_SUCCESS',
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: 'Add_POST_FAILURE',
            data: err.response.data,
        })
    }
}


function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
}