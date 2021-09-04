import { all, call, fork, takeLatest, put, throttle } from "redux-saga/effects";
import axios from 'axios';

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

    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,

    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,

    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function uploadImagesAPI(data) { // 제네레이터 아님
    return axios.post('/post/images', data);
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data,
        });
    }
}

function unlikePostAPI(data) { // 제네레이터 아님
    return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function likePostAPI(data) { // 제네레이터 아님
    return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LIKE_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function addPostAPI(data) { // 제네레이터 아님
    return axios.post('/post', { content: data });
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({ // post reducer 조작
            type: ADD_POST_SUCCESS,
            data: result.data,
        }); // 한번에 user와 post를 조작할 수 없으므로 action을 두가지로 나눠서 진행한다.
        yield put({ // user reducer 조작 
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function loadPostAPI(data) { // 제네레이터 아님
    return axios.get('/posts', data);
}

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function removePostAPI(data) { // 제네레이터 아님
    return axios.delete(`/post/${data}`);
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({ // post reducer 조작
            type: REMOVE_POST_SUCCESS,
            data: result.data, // action.data에 어떤 게시물을 지웠는지 id가 들어있음
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
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }
}


function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
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
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchloadPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}