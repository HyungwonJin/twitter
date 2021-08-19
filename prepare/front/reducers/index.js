import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";

const rootReducer = combineReducers({
    // SSR을 위한 index
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                return { ...state, ...action.payload };

            default:
                return state;
        }
    },
    user,
    post,
});

export default rootReducer;