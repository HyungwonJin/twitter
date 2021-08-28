import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'Doraemon',
        },
        content: '첫번째 게시글 #해시태그 #익스프레스',
        Images: [{
            id: shortId.generate(),
            src: "https://images.unsplash.com/photo-1629287120817-458e67b9f641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2466&q=80"
        }, {
            id: shortId.generate(),
            src: "https://images.unsplash.com/photo-1466078415375-6d055d48434b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
        }, {
            id: shortId.generate(),
            src: "https://images.unsplash.com/photo-1628020681459-36f808315107?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
        }],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'nero',
            },
            content: '보기 좋습니다.',
        }, {
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'Pikachu',
            },
            content: "아름답네요."
        }]
    }],
    imagePaths: [],

    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Images: [{
            src: faker.image.image(),
        }],
        Comments: [{
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.sentence(),
        }],
    })),
)

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

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'Doraemon',
    },
    Images: [],
    Comments: []
})

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'Doraemon',
    },
})
// reducer란 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => { // state가 이름이 draft로 바뀜
        switch (action.type) {
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
                draft.mainPosts.unshift(dummyPost(action.data));
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
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
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
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);// 원하는 post를 찾아서
                post.Comments.unshift(dummyComment(action.data.content)); // 제일 앞에 게시글을 추가
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