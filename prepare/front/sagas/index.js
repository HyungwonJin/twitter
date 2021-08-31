import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
    yield all([ // 배열 안에 있는 모든 것을 실행
        fork(postSaga),   // fork는 함수를 실행
        fork(userSaga),
    ]);
}