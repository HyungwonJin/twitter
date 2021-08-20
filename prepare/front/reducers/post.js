export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'Doraemon',
        },
        content: '첫번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: "https://images.unsplash.com/photo-1629287120817-458e67b9f641?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2466&q=80"
        }, {
            src: "https://images.unsplash.com/photo-1466078415375-6d055d48434b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
        }, {
            src: "https://images.unsplash.com/photo-1628020681459-36f808315107?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80"
        }],
        Comments: [{
            User: {
                nickname: 'nero',
            },
            content: '보기 좋습니다.',
        }, {
            User: {
                nickname: 'Pikachu',
            },
            content: "아름답네요."
        }]
    }],
    imagePaths: [],
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '더미데이터 입니다.',
    User: {
        id: 1,
        nickname: 'Doraemon',
    },
    Images: [],
    Comments: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                // 추가 되는 게시물을 앞에 입력해야 최상단에 위치함
                postAdded: true,
            }
        default:
            return state
    }
}

export default reducer;