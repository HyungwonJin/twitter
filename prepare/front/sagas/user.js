import { all, fork, takeLatest, delay, put } from "redux-saga/effects";
import axios from "axios";


//function 제네레이터 아님
function logInAPI(data) { // (3) call을 해서 받은 logInAPI(action.data)임
    return axios.post('/api/login', data);
}

function* logIn(action) { // (1)watchLogIn함수에서 받은 action을 매개변수로 받음
    try {
        // const result = yield call(logInAPI, action.data); // (2)action으로 받은 로그인 data가 들어있음
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data,
            // data: result.data,
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
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            // data: result.data,
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn); //LOG_IN_REQUEST 이라는 명령이 시행될 때까지 기다림
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}