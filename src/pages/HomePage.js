import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import PostStyled from '../styles/PostStyled.js'
import { Button, Wrap, Container } from '../styles/GlobalStyle'
import { selectPagePosts, selectIsLoading, getPagePosts, deletePost } from '../features/post/postSlice'
import { selectUser } from '../features/user/userSlice'
import LoadingPage from '../pages/LoadingPage'

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

const PaginationButton = styled(Button)`
  margin: .5rem;
`

const Post = ({post, currentUser, handleDelete}) => {
  const { id, title, createdAt, body, user } = post
  const isSameId = currentUser && currentUser.id === user.id
  return (
    <PostsStyled>
      <Link className="title" to={`/post/${id}`} >{title}</Link>
      <p className="info">{new Date(createdAt).toLocaleString().replace(',','')}</p>
      <Link className="author" to={`/user/${user.id}`} > - {user.nickname}</Link>
      <p className="content">{body.length > 60 ? `${body.slice(0,60)}...` : body}</p>
      {isSameId && <div className="delete" onClick={() => handleDelete(id)}>刪除</div>}
      {isSameId && <Link to={`/edit-post/${id}`} className="edit">編輯</Link>}
    </PostsStyled>
  )
}

Post.propTypes = {
  post: PropTypes.object
}

const Pagination = ({ page, setPage, lastPageNumber }) => {
  const isPageInFirst = page !== 1
  const isPageInLast = page !== lastPageNumber

  const handleNext = () => {
    if (page >= lastPageNumber) return
    setPage(() => page + 1)
  }

  const handlePrev = () => {
    if (page <= 1) return
    setPage(() => page - 1)
  }

  return (
    <div>
      <Container>
        {isPageInFirst && (
          <PaginationButton onClick={() => setPage(1)}>首頁</PaginationButton>
        )}
        {isPageInFirst && (
          <PaginationButton onClick={handlePrev}>上一頁</PaginationButton>
        )}
        {isPageInLast && (
          <PaginationButton onClick={handleNext}>下一頁</PaginationButton>
        )}
        {isPageInLast && (
          <PaginationButton onClick={() => setPage(lastPageNumber)}>
            最後一頁
          </PaginationButton>
        )}
      </Container>
      <Container>
        <div>
          頁數：{page} / {lastPageNumber}
        </div>
      </Container>
    </div>
  )
}

const HomePage = () => {
  const [page, setPage] = useState(1)
  const [lastPageNumber, setLastPageNumber] = useState(0)
  const dispatch = useDispatch()
  const posts = useSelector(selectPagePosts)
  const isLoading = useSelector(selectIsLoading)
  const currentUser = useSelector(selectUser)
  const { REACT_APP_PER_PAGE_ITEM:perPageItem } = process.env

  useEffect(() => {
    (async () => {
      const res = await dispatch(getPagePosts(page, perPageItem))
      setLastPageNumber(res)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })()
  },[dispatch, page, perPageItem, ])

  const handleDelete = async (id) => {
    await dispatch(deletePost(id))
    const res = await dispatch(getPagePosts(page, perPageItem))
    setLastPageNumber(res)
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
          {posts && posts.map((post) =>
            <Post key={post.id} post={post} currentUser={currentUser} handleDelete={handleDelete} /> 
          )}
          <Pagination page={page} setPage={setPage} lastPageNumber={lastPageNumber}/>
        </PostWrap>
      </Wrap>
    </>
  )
}

export default HomePage;
