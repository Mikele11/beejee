import { FETCH_POSTS, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/types'
import axios from 'axios';

export const fetchPosts =()=> dispatch => {
  return axios.get(`/api/post`)
  .then(res => {
    dispatch({
      type: FETCH_POSTS,
      payload: res.data
    })
  })
  .catch((error) => {
    console.log('action err',error)	  
  });
};

export const deletePost = id => dispatch => {
  return axios.delete(`/api/post/${id}`)
  .then((result) => {
    axios.get('/api/post')
      .then(res => {
        dispatch({
          type: DELETE_POST,
          payload: res.data
        })
      })
      .catch((error) => {
        console.log('error',error);
      });
  });
};

export const createPost = (postData) => dispatch => {
  return axios.post(`/api/post`,postData)
    .then((res) =>{
      console.log('new_post',res)
        dispatch({
          type: NEW_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};

export const updatePost = (id,postData) => dispatch => {
  return axios.put(`/api/post/${id}`,postData)
    .then((res) =>{
      console.log('update_post',res)
        dispatch({
          type: UPDATE_POST,
          payload: res.data
        })
      }
    )
    .catch(err =>{
      console.log('action err',err)
  });
};

