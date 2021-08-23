export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
}

export const loginRequestAction = (data) => {
    return {
        type: "LOG_IN_REQUEST",
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: "LOG_IN_SUCCESS",
        data,
    }
}

export const loginFailureAction = () => {
    return {
        type: "LOG_IN_FAILURE",
    }
}

export const logoutRequestAction = () => {
    return {
        type: "LOG_OUT_REQUEST",
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOG_IN':
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            }
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }

        default:
            return state
    }
}

export default reducer;