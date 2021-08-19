export const initialState = {
    mainPosts: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case typeName:
            return { ...state, ...payload }

        default:
            return state
    }
}

export default reducer;