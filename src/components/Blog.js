import React, { useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'

import HomePage from '../pages/HomePage.js'
import AboutPage from '../pages/AboutPage.js'
import UserPage from '../pages/UserPage.js'
import OnePostPage from '../pages/OnePostPage.js'
import UserPostsPage from '../pages/UserPostsPage.js'
import PostPage from '../pages/PostPage.js'
import ErrorPage from '../pages/ErrorPage.js'

import Nav from './Nav'
import Footer from './Footer'
import theme from '../styles/theme'
import { getTheme } from '../localStorageAPI.js'

const Container = styled.div`
  background-color: ${({theme}) => theme.bodyColor};
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 4.6rem);
`

function Blog() {
  const [currentTheme, setCurrentTheme] = useState(getTheme())
  return (
    <ThemeProvider theme={theme[currentTheme]}>

      <Router basename="/blog">
        <Nav currentTheme={currentTheme} setCurrentTheme={setCurrentTheme} />
        <Container>
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/login">
              <UserPage userMethod="login"/>
            </Route>
            <Route exact path="/register">
              <UserPage userMethod="register"/>
            </Route>
            <Route exact path="/new-post">
              <PostPage postMethod="add"/>
            </Route>
            <Route exact path="/edit-post/:editId">
              <PostPage postMethod="edit"/>
            </Route>

            <Route exact path="/post/:id">
              <OnePostPage />
            </Route>
            <Route exact path="/user/:userId">
              <UserPostsPage />
            </Route>

            <Route exact path="*">
              <ErrorPage title="404 not found..."/>
            </Route>

          </Switch>
        </Container>
        <Footer />
      </Router>

    </ThemeProvider>
  );
}

export default Blog;
