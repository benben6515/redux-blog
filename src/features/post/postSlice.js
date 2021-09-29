import { createSlice } from '@reduxjs/toolkit'
import {
  getPostAPI,
  getPostsAPI,
  getUserPostsAPI,
  addPostAPI,
  updatePostAPI,
  deletePostAPI } from '../../webAPI'

const initialState = {
  isLoading: false,
  oenPost: null,
  editPost: null,
  pagePosts: [],
  userPosts: [],
  newPostResponse: null,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setOnePost: (state, action) => {
      state.onePost = action.payload
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload
    },
    setPagePosts: (state, action) => {
      state.pagePosts = action.payload
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload
    } 
  },
})

export const {
  setIsLoading,
  setOnePost,
  setEditPost,
  setPagePosts,
  setUserPosts,
  setLastPageNumber,
  setNewPostResponse } = postSlice.actions

// get one post
export const getOnePost = id => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await getPostAPI(id)
    dispatch(setOnePost(res))
    dispatch(setIsLoading(false))
  } catch(err) {
    console.log(err)
  }
}

// get posts by page
export const getPagePosts = (page, perPageItem) => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await getPostsAPI(page, perPageItem)
    dispatch(setPagePosts(res.data))
    dispatch(setIsLoading(false))
    return res.lastPage
  } catch(err) {
    console.log(err)
  }
}

// get posts of one user
export const getUserPosts = (userId) => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await getUserPostsAPI(userId)
    dispatch(setUserPosts(res.posts))
    dispatch(setIsLoading(false))
    return res
  } catch(err) {
    console.log(err)
  }
}

// get edit post
export const getEditPost = id => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await getPostAPI(id)
    dispatch(setEditPost(res))
    dispatch(setIsLoading(false))
  } catch(err) {
    console.log(err)
  }
}

export const addPost = (token, title, content) => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await addPostAPI(token, title, content)
    dispatch(setNewPostResponse(res))
    dispatch(setIsLoading(false))
    return res
  } catch(err) {
    console.log(err)
  }
}

export const updatePost = (postId, token, title, content) => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await updatePostAPI(postId, token, title, content)
    dispatch(setIsLoading(false))
    return res
  } catch(err) {
    console.log(err)
  }
}

export const deletePost = (postId, token) => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const res = await deletePostAPI(postId, token)
    dispatch(setIsLoading(false))
    return res
  } catch(err) {
    console.log(err)
  }
}

export const selectOnePost = (state) => state.posts.onePost
export const selectEditPost = (state) => state.posts.editPost
export const selectPagePosts = (state) => state.posts.pagePosts
export const selectUserPosts = (state) => state.posts.userPosts
export const selectNewPostResponse = (state) => state.posts.newPostResponse
export const selectIsLoading = (state) => state.posts.isLoading

export default postSlice.reducer
