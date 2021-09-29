import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import LoadingPage from '../pages/LoadingPage'
import { setAuthToken, getAuthToken } from '../localStorageAPI'
import { Wrap, Button, Container } from '../styles/GlobalStyle'
import { getMe, login, register, selectIsUserLoading } from '../features/user/userSlice'

const LoginWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputWrap = styled.form`
  width: clamp(25ch, 40%, 35ch);
  padding: 1rem;
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
  input[type=text], input[type=password] {
    width: 100%;
    background: ${({theme}) => theme.foregroundColor};
    border: none;
    border-bottom: 1px solid ${({theme}) => theme.titleColor};
    border-radius: .3rem;
    padding-left: .5rem;
    height: 1.5rem;
    line-height: 1.2;
    &:focus {
      outline: none;
    }
  }
`

const Input  = ({ userMethod }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const isUserLoading = useSelector(selectIsUserLoading)

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!username || !password) {
      return setErrorMessage('請輸入帳號或密碼')
    }
    if (!username.trim().length
      || !password.trim().length
    ) return setErrorMessage('帳號或密碼不得為空白')

    const loginResponse = await dispatch(login(username, password))
    if (!loginResponse.ok) return setErrorMessage('帳號或密碼錯誤')
    setAuthToken(loginResponse.token)

    const getMeResponse = await dispatch(getMe(getAuthToken()))
    if (!getMeResponse.ok) {
      setAuthToken(null)
      return setErrorMessage('帳號或密碼錯誤')
    }
    history.push("/")
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!nickname || !username || !password || !passwordAgain) {
      return setErrorMessage('請輸入暱帳號、密碼或再次確認密碼')
    }
    if (!nickname.trim().length
      || !username.trim().length
      || !password.trim().length
      || !passwordAgain.trim().length
    ) return setErrorMessage('暱帳號、密碼或再次確認密碼 不得為空白')

    const loginResponse = await dispatch(register(nickname, username, password))
    if (!loginResponse.ok) return setErrorMessage('註冊失敗')
    setAuthToken(loginResponse.token)

    const getMeResponse = await dispatch(getMe(getAuthToken()))
    if (!getMeResponse.ok) {
      setAuthToken(null)
      return setErrorMessage('帳號或密碼錯誤')
    }
    history.push("/")
  }

  return (
    <InputWrap onSubmit={
      userMethod === "login"
      ? handleLogin
      : handleRegister
    }>
      <h1>{userMethod}</h1>
      {errorMessage && <div>{errorMessage}！</div>}
      {isUserLoading && <LoadingPage />}
      {userMethod === "register" && (
        <>
          <div className="title">暱稱：</div>
          <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
        </>
      )}

      <div className="title">帳號：</div>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <div className="title">密碼：</div>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

      {userMethod === "register" && (
        <>
          <div className="title">再次確認密碼：</div>
          <input type="password" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)} />
        </>
      )}
      <Button className="button">{userMethod}</Button>
    </InputWrap>
  )
}

const UserPage = ({ userMethod }) => {
  return (
    <Wrap>
      <Container>
        <LoginWrap>
          <Input userMethod={userMethod}/>
        </LoginWrap>
      </Container>
    </Wrap>
  )
}

export default UserPage;
