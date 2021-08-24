import { all, call, fork, put, takeLatest, delay } from "@redux-saga/core/effects";

import postSaga from "./post";
import userSaga from "./user";

export default function* rootSaga() {
    yield all([ // 배열 안에 있는 모든 것을 실행
        fork(postSaga),   // fork는 함수를 실행
        fork(userSaga),
    ]);
}