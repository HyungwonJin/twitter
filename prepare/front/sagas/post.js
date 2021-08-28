import { all, fork, takeLatest, delay, put, throttle } from "redux-saga/effects";
import axios from 'axios';
import shortid from "shortid";

import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,

    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function addPostAPI(data) { // 제네레이터 아님
    return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortid.generate();
        yield put({ // post reducer 조작
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
        }); // 한번에 user와 post를 조작할 수 없으므로 action을 두가지로 나눠서 진행한다.
        yield put({ // user reducer 조작 
            type: ADD_POST_TO_ME,
            data: id,
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function loadPostAPI(data) { // 제네레이터 아님
    return axios.get('/api/post', data);
}

function* loadPost(action) {
    try {
        // const result = yield call(loadPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function removePostAPI(data) { // 제네레이터 아님
    return axios.delete('/api/post', data);
}

function* removePost(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({ // post reducer 조작
            type: REMOVE_POST_SUCCESS,
            data: action.data, // action.data에 어떤 게시물을 지웠는지 id가 들어있음
        });
        // 한번에 user와 post를 조작할 수 없으므로 action을 두가지로 나눠서 진행한다.
        yield put({ // user reducer 조작 
            type: REMOVE_POST_OF_ME,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function addCommentAPI(data) { // 제네레이터 아님
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchloadPost() {
    yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchloadPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}