import produce from 'immer';

export const initialState = {
    mainPosts: [],
    imagePaths: [],

    hasMorePost: true,

    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,

    likePostLoading: false,
    likePostDone: false,
    likePostError: null,

    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
}


export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
})

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

// reducer란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => { // state가 이름이 draft로 바뀜
        switch (action.type) {
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;

            case UPLOAD_IMAGES_SUCCESS: {
                draft.imagePaths = action.data;
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                break;
            }
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.loadPostError = action.error;
                break;

            case UNLIKE_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;

            case UNLIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;

            case LIKE_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;

            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;

            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;

            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts); // mainPosts에 추가되는 게시물을 이어붙임
                draft.hasMorePost = draft.mainPosts.length < 50; // 덧붙인 길이가 50을 넘는가?
                break;

            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;

            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            // return {
            //     ...state,
            //     addPostLoading: true,
            //     addPostDone: false,
            //     addPostError: null,
            // }

            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(action.data);
                // draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
                break;

            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;

            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;

            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
                break;
            // return {
            //     ...state,
            //     mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
            //     // 추가 되는 게시물을 앞에 입력해야 최상단에 위치함
            //     removePostLoading: false,
            //     removePostDone: true,
            // }

            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;

            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);// 원하는 post를 찾아서
                post.Comments.unshift(action.data); // 제일 앞에 게시글을 추가
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // }
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            default:
                break;
            // return state
        }

    })


}

export default reducer;