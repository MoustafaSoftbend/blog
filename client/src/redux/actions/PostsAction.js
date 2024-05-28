import { FETCH_POSTS } from '../types';
import axios from 'axios'



export const fetchPosts = () => async dispatch =>  {
    try {
        const res = await axios.get('/api/v1/posts')
        const posts = res.data.data
        dispatch({
            type: FETCH_POSTS,
            payload: res.data.data
        })
        return posts
    }
    catch(e) {
        console.log(e)
    }
}