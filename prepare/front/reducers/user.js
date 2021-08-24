export const initialState = {
    isLoggingIn: false, // 로그인 시도 중
    isLoggedIn: false,
    isLoggingOut: false, // 로그아웃 시도 중
    me: null,
    signUpData: {},
    loginData: {},
}


// login에 관련된 action 3가지
export const loginRequestAction = (data) => {
    return {
        type: "LOG_IN_REQUEST",
        data,
    }
}


// 로그아웃에 관련된 action 3가지
export const logoutRequestAction = () => {
    return {
        type: "LOG_OUT_REQUEST",
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'LOG_IN_REQUEST':
            return {
                ...state,
                isLoggingIn: true,
            }

        case 'LOG_IN_SUCCESS':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: "JIN" },
            };

        case 'LOG_IN_FAILURE':
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            };

        case 'LOG_OUT_REQUEST':
            return {
                ...state,
                isLoggingOut: true,
            }

        case 'LOG_OUT_SUCCESS':
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null,
            }

        case 'LOG_OUT_FAILURE':
            return {
                ...state,
                isLoggingOut: false,
            }

        default:
            return state
    }
}

export default reducer;