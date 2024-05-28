import {combineReducers} from 'redux';
import PostsReducers from "./PostsReducers"

export default combineReducers({
    Posts: PostsReducers
});