import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'

import ErrorPage from './ErrorPage.js'
import LoadingPage from './LoadingPage.js'
import { Wrap, Button } from '../styles/GlobalStyle'
import { getEditPost, addPost, updatePost, selectEditPost, selectIsLoading } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import { getAuthToken } from '../localStorageAPI.js'

const NewPostWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
`

const InputWrap = styled.form`
  width: clamp(25ch, 70%, 70ch);
  padding: 1rem;
  margin: 3rem auto 2rem;
  box-shadow: ${({theme}) => theme.navBoxShadow};
  border: 1px solid ${({theme}) => theme.infoColor};
  border-radius: .4rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .button {
    align-self: center;
    justify-content: center;
    margin: 2rem 0 1rem;
    width: clamp(3rem, 30%, 6rem);
  }
  .title {
    align-self: flex-start;
    margin: 1rem 0;
    font-size: 1.2rem;
  }
  input[type=text], textarea {
    width: 100%;
    font-size: 1.2rem;
    background: ${({theme}) => theme.foregroundColor};
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.titleColor};
    border-radius: .3rem;
    padding-left: .5rem;
    height: 1.8rem;
    line-height: 1.2;
    &:focus {
      outline: none;
    }
  }
  textarea {
    padding-top: .5rem;
    height: auto;
    resize: vertical;
  }
  span {
    max-width: 100%;
    align-self: flex-end;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const Input  = ({ user, isEdit, editPost }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const token = getAuthToken()

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title)
      setContent(editPost.body)
    }
    if (location.pathname === '/new-post') {
      setTitle('')
      setContent('')
    }
  },[editPost, location.pathname])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!title || !content) {
      return setErrorMessage('請輸入標題或內容')
    }
    if (!title.trim().length
      || !content.trim().length
    ) return setErrorMessage('標題或內容不得為空白')

    let res = null
    if (isEdit) {
      res = await dispatch(updatePost(editPost.id, token, title, content))
    } else {
      res = await dispatch(addPost(token, title, content ))
    }
    if (!res) {
      return setErrorMessage('操作失敗')
    }
    if (res && res.id ) history.push("/post/" + res.id)
  }

  return (
    <InputWrap onSubmit={handleSubmit}>
      <h1>{isEdit ? '更新' : '發布'}文章</h1><span> - {user.nickname}</span>
      {errorMessage && <div>{errorMessage}！</div>}
      <div className="title">標題：</div>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="請輸入標題..."/>
      <div className="title">內容：</div>
      <textarea onChange={e => setContent(e.target.value)} rows="6" placeholder="請輸入內容..." value={content} />
      <Button className="button">{isEdit ? '更新' : '送出'}</Button>
    </InputWrap>
  )
}

const PostPage = ({ postMethod }) => {
  const isEdit = postMethod === 'edit'
  const { editId } = useParams()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectIsLoading)
  const editPost = useSelector(selectEditPost)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEditPost(editId))
  },[editId, dispatch])

  return (
    <>
      <Wrap>
        <NewPostWrap>
          {isLoading && <LoadingPage />}
          {user && <Input user={user} isEdit={isEdit} editPost={editPost} />}
          {!user && <ErrorPage title="Login first..." /> }
        </NewPostWrap>
      </Wrap>
    </>
  )
}

export default PostPage;
