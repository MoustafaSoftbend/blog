import {FETCH_POSTS} from "../types"

const initialState = {
    posts_carousel: []
}

export default function(state= initialState, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts_carousel: action.payload
            }
        default:
             return state;
    }
}