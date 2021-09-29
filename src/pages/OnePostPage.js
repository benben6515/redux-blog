import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import PostStyled from '../styles/PostStyled.js'
import { Wrap } from '../styles/GlobalStyle'
import { selectIsLoading, selectOnePost, getOnePost } from '../features/post/postSlice'
import LoadingPage from './LoadingPage'

const PostWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
`

const Post = ({post}) => {
  const { id, title, createdAt, body, user } = post
  return (
    <PostStyled>
      <Link className="title" to={`/post/${id}`} >{title}</Link>
      <p className="info">{new Date(createdAt).toLocaleString().replace(',','')}</p>
      <Link className="author" to={`/user/${user.id}`} > - {user.nickname}</Link>
      <p className="content" style={{
        marginTop: '1rem',
        lineHeight: 2,
        letterSpacing: '3px',
        whiteSpace: 'pre-wrap',
      }}>{body}</p>
    </PostStyled>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

const PostPage = () => {
  const dispatch = useDispatch()
  let { id } = useParams()
  const post = useSelector(selectOnePost)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(getOnePost(id))
  },[id, dispatch])

  return (
    <>
      <Wrap>
        <PostWrap>
          {isLoading && <LoadingPage />}
          {post && <Post post={post} />} 
        </PostWrap>
      </Wrap>
    </>
  )
}

export default PostPage;
