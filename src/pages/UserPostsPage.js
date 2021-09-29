import React, { useEffect, useState }from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import PostStyled from '../styles/PostStyled.js'
import { Wrap } from '../styles/GlobalStyle'
import { selectUserPosts, selectIsLoading, getUserPosts, deletePost } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import LoadingPage from './LoadingPage'

const PostWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
`

const PostsStyled = styled(PostStyled)`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1rem 1rem auto;
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content:first-letter {
    font-size: 1.2rem;
    font-weight: 600;
    margin-right: .5rem;
    float: left;
  }
`

const Post = ({post, userNickname, handleDelete, isSameId}) => {
  const { id, title, createdAt, body, userId } = post
  return (
    <PostsStyled>
      <Link className="title" to={`/post/${id}`} >{title}</Link>
      <p className="info">{new Date(createdAt).toLocaleString().replace(',','')}</p>
      <Link className="author" to={`/user/${userId}`} > - {userNickname}</Link>
      <p className="content">{body.length > 60 ? `${body.slice(0,60)}...` : body}</p>
      {isSameId && <div className="delete" onClick={() => handleDelete(id)}>刪除</div>}
      {isSameId && <Link to={`/edit-post/${id}`} className="edit">編輯</Link>}
    </PostsStyled>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

const UserPostsPage = () => {
  const [ userNickname ,setUserNickname ] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const userPosts = useSelector(selectUserPosts)
  const isLoading = useSelector(selectIsLoading)
  let { userId } = useParams()
  let isSameId = false
  if (user) {
    isSameId = Number(userId) === user.id
  }

  useEffect(() => {
    (async () => {
      const res = await dispatch(getUserPosts(userId))
      setUserNickname(res.nickname)
    })()
  },[dispatch, userId])

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    const res = await dispatch(getUserPosts(userId))
    setUserNickname(res.nickname)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <Wrap>
        <PostWrap>
          {isLoading && <LoadingPage />}
          {userPosts && userPosts.map((post) => 
            <Post key={post.id} post={post} userNickname={userNickname} handleDelete={handleDelete} isSameId={isSameId} />
          )}
        </PostWrap>
      </Wrap>
    </>
  )
}

export default UserPostsPage;
