import axios from 'axios';
import setAlert from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// get posts

export const getPosts =() => async dispatch=>{
  try{
   const res = await axios.get('api/posts');
   dispatch({
       type: GET_POSTS,
       payload: res.data
   })
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Add like
export const addLike = id => async dispatch=>{
  try{
   const res = await axios.put(`api/posts/like/${id}`);
   dispatch({
       type: UPDATE_LIKES,
       payload: {id, likes:res.data}
   })
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Remove like
export const removeLike = id => async dispatch=>{
  try{
   const res = await axios.put(`api/posts/unlike/${id}`);
   dispatch({
       type: UPDATE_LIKES,
       payload: {id, likes:res.data}
   })
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Delete Post
export const deletePost = id => async dispatch=>{
  try{
   const res = await axios.delete(`api/posts/${id}`);
   dispatch({
       type: DELETE_POST,
       payload: id
   })

   dispatch(setAlert('Post Removed','Success'));
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Add Post
export const addPost = FormData => async dispatch=>{

    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
  try{
   const res = await axios.post('api/posts', FormData,config);
   dispatch({
       type: ADD_POST,
       payload: res.data
   })

   dispatch(setAlert('Post Created','Success'));
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

// get post
export const getPost =id => async dispatch=>{
  try{
   const res = await axios.get(`api/posts/${id}`);
   dispatch({
       type: GET_POST,
       payload: res.data
   })
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Add Comment
export const addComment = (postId,FormData) => async dispatch=>{

    const config={
        header:{
            'Content-Type':'application/json'
        }
    }
  try{
   const res = await axios.post(`api/posts/comment/${postId}`, FormData,config);
   dispatch({
       type: ADD_COMMENT,
       payload: res.data
   })

   dispatch(setAlert('Comment Added','Success'));
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}

//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch=>{

  try{
   const res = await axios.delete(`api/posts/comments/${postId}/${commentId}`);
   dispatch({
       type: REMOVE_COMMENT,
       payload: commentId
   })

   dispatch(setAlert('Comment Removed','Success'));
  }catch(err){
   dispatch({
           type: POST_ERROR,
           payload: {msg: err.response.statusText, status: err.response.status}
       })
  }
}