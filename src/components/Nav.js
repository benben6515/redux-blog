import React, { useEffect, useRef } from 'react'
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

// import { AuthContext } from '../contexts'
import { setAuthToken, setTheme } from '../localStorageAPI.js'
import { ReactComponent as DayNightIcon } from '../images/day_night_icon.svg'
import { drift, flash } from '../styles/animations.js'
import { selectUser, getMe, setUser } from '../features/user/userSlice'
import { getAuthToken } from '../localStorageAPI'

// styled ----------------------
const IconWrap = styled.div`
  width: 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  > svg {
    width: 1.5rem;
    height: 1.5rem;
    path {
      fill: ${({theme}) => theme.titleColor};
    }
  }
`

const NavWrap = styled.div`
  width: 100%;
  height: 3rem;
  box-shadow: ${({theme}) => theme.navBoxShadow};
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.titleColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  z-index: 3;

  #menu__btn, #menu__control {
    display: none;
  }
  #menu__btn > span {
    display: none;
  }
  @media screen and (max-width: 840px) {
    #menu__btn {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid ${({theme}) => theme.titleColor};
      border-radius: .3rem;
      position: relative;
      cursor: pointer;
      margin-right: 1rem;
    }
    #menu__btn::before {
      content: '';
      position: absolute;
      top: 51%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: .1rem;
      width: .9rem;
      background-color: ${({theme}) => theme.textColor};
      border-radius: .1rem;
      box-shadow: 0 .3rem 0px ${({theme}) => theme.textColor}, 0 -.3rem 0px ${({theme}) => theme.textColor};
    }
    #menu__btn:hover {
      filter: brightness(0.6);
    }
    #menu__control:checked+div {
      height: auto;
      max-height: 100vh;
    }
  }

`

const Title = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.titleColor};
  text-shadow: 1px 1px 3px ${({ theme }) => theme.infoColor};
  font-size: 1.4rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    animation: ${flash} 1s ease-in alternate infinite;
  }
  span {
    width: 3rem;
    height: 1px;
    position: absolute;
    background: linear-gradient( 90deg, transparent, 
      ${({theme}) => theme.titleColor});
    transform: translateX(-50%);
    animation: ${drift} 2s linear infinite;
    z-index: 1;
  }
  &:hover span {
    width: 5rem;
    animation: ${drift} 1s linear infinite;
  }
  span:nth-of-type(1) {
    top: 45%;
    left: 50%;
  }
  span:nth-of-type(2) {
    top: 55%;
    left: 50%;
    animation-delay: .25s;
  }
  span:nth-of-type(3) {
    top: 65%;
    left: 50%;
    animation-delay: .5s;
  }
  span:nth-of-type(4) {
    top: 75%;
    left: 50%;
    animation-delay: .75s;
  }
`

const Buttons = styled.div`
  display: flex;
  input[name=nav] {
    display: none;
    z-index: -1;
  }
  input[name=nav]:checked + label > a {
    background: ${({theme}) => theme.navCheckColor};
    color: ${({theme}) => theme.bodyColor};
  }
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0;
    max-height: 0;
    overflow:hidden;
    position: absolute;
    top: 3rem;
    transition: max-height .8s ease;
    margin: 0;
    padding: 0;
    z-index: -1;
  }
`

const NavButton = styled(Link)`
  display: block;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  line-height: 3rem;
  padding: 0 1rem;
  margin: 0;
  overflow: hidden;
  color: ${({theme}) => theme.titleColor};
  background-color: ${({theme}) => theme.backgroundColor};
  &:hover {
    filter:brightness(${({theme}) => theme.hoverFilter});
  }
  @media screen and (max-width: 840px) {
    backdrop-filter: blur(2px);
    width: 100vw;
    padding: 0;
  }
`

const NavLogoutButton = styled.div`
  display: block;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  line-height: 3rem;
  padding: 0 1rem;
  margin: 0;
  overflow: hidden;
  color: ${({theme}) => theme.titleColor};
  background-color: ${({theme}) => theme.backgroundColor};
  &:hover {
    filter:brightness(${({theme}) => theme.hoverFilter});
  }
  @media screen and (max-width: 840px) {
    backdrop-filter: blur(2px);
    width: 100vw;
    padding: 0;
  }
`

const IconButton = styled.div`
  display: block;
  border: none;
  border-radius: 0;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  line-height: 3rem;
  padding-right: 1rem;
  margin: 0;
  color: ${({theme}) => theme.titleColor};
  background-color: ${({theme}) => theme.backgroundColor};
  z-index: 3;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 840px) {
    padding-right: .5rem;
  }

`

const NavButtonWrap = ({ title, to, activeOnlyWhenExact }) => {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  })

  return (
    <div>
      {match ? (
        <input type="radio" name="nav" checked readOnly={true} />
      ) : (
        <input type="radio" name="nav" />
      )}
      <label>
        <NavButton to={to}>{title}</NavButton>
      </label>
    </div>
  )
}

// component --------------------------
const Nav = ({currentTheme, setCurrentTheme}) => {
  const location = useLocation()
  const history = useHistory()
  const toggleNav = useRef(null)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      if (!getAuthToken()) return
      await dispatch(getMe(getAuthToken()))
    })()
  }, [dispatch])

  useEffect(() => {
    toggleNav.current.checked = false
  },[location])
  
  const handleTheme = () => {
    if (currentTheme === 'light') {
      setCurrentTheme('dark')
      setTheme('dark')
    } else {
      setCurrentTheme('light')
      setTheme('light')
    }
  }

  const handleLogout = () => {
    setAuthToken('')
    dispatch(setUser(null))
    if (location.pathname !== "/") {
      history.push("/")
    }
  }

  return (
      <NavWrap>
        <Title to="/">
          benben's blog
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Title>

        <label htmlFor="menu__control" id="menu__btn">
          <span>menu</span>
        </label>
        <input id="menu__control" type="checkbox" ref={toggleNav}/>
        <Buttons>

          <NavButtonWrap to="/about" title="About" activeOnlyWhenExact={true} />
          {user
            ? ( <NavButtonWrap to="/new-post" title="New Post" activeOnlyWhenExact={true}/> )
            : ( <NavButtonWrap to="/login" title="Login" activeOnlyWhenExact={true}/> )
          }
          {user
            ? ( <NavLogoutButton onClick={handleLogout}>logout</NavLogoutButton> )
            : ( <NavButtonWrap to="/register" title="Register" activeOnlyWhenExact={true}/> )
          }

        </Buttons>
        <IconButton onClick={handleTheme}>
        <IconWrap><DayNightIcon /></IconWrap>
        </IconButton>
      </NavWrap>
  )
}

export default Nav