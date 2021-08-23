import { all, call, fork, put, take } from "@redux-saga/core/effects";
import axios from 'axios';

//function 제네레이터 아님
function logInAPI(data) { // (3) call을 해서 받은 logInAPI(action.data)임
    return axios.post('/api/login', data);
}

function* logIn(action) { // (1)watchLogIn함수에서 받은 action을 매개변수로 받음
    try {
        const result = yield call(logInAPI, action.data); // (2)action으로 받은 로그인 data가 들어있음
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data,
        })
    } catch (err) {
        yield put({ // put은 dispatch라고 생각
            type: 'LOG_IN_FAILURE', // Action이라고 생각
            data: err.response.data,
        })
    }
}

function logOutAPI() { // 제네레이터 아님
    return axios.post('/api/logout');
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }
}

function addPostAPI(data) { // 제네레이터 아님
    return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
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

function* watchLogIn() {
    yield take('LOG_IN_REQUEST', logIn); //LOG_IN_REQUEST 이라는 명령이 시행될 때까지 기다림
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
    yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
    yield all([ // 배열 안에 있는 모든 것을 실행
        fork(watchLogIn),   // fork는 함수를 실행
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}