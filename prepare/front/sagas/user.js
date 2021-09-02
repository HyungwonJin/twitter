import { all, fork, takeLatest, delay, put, call } from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_IN_REQUEST,
    LOG_OUT_FAILURE, LOG_OUT_SUCCESS, LOG_OUT_REQUEST,
    SIGN_UP_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_REQUEST,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
} from "../reducers/user";

// function 제네레이터 아님
function loadUserAPI() {
    return axios.get('/user');
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

function followAPI(data) {
    return axios.post('/api/follow', data);
}

function* follow(action) {
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function unfollowAPI(data) {
    return axios.post('/api/unfollow', data);
}

function* unfollow(action) {
    try {
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function logInAPI(data) { // (3) call을 해서 받은 logInAPI(action.data)임
    return axios.post('/user/login', data);
}

function* logIn(action) { // (1)watchLogIn함수에서 받은 action을 매개변수로 받음
    try {
        const result = yield call(logInAPI, action.data); // (2)action으로 받은 로그인 data가 들어있음
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
            // data: result.data,
        })
    } catch (err) {
        yield put({ // put은 dispatch라고 생각
            type: LOG_IN_FAILURE, // Action이라고 생각
            error: err.response.data,
        })
    }
}

function logOutAPI() { // 제네레이터 아님
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data,
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signUpAPI(data) { // 제네레이터 아님
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLoadUser() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn); // LOG_IN_REQUEST 이라는 명령이 시행될 때까지 기다림
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}


export default function* userSaga() {
    yield all([
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}