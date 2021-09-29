import { css } from '@emotion/react'
import styled from '@emotion/styled'

const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: '微軟正黑體','Roboto';
    transition: color 2s;
    transition: background-color .8s;
  }

  html, body, #root {
    width: 100%;
  }

  a {
    text-decoration: none;
  }
`

const Button = styled.button`
  background-color: ${({theme}) => theme.backgroundColor};
  border: 1px solid ${({theme}) => theme.textColor};
  border-radius: .2rem;
  padding: 0 .5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  cursor: pointer;
  &:hover{
    filter: brightness(${({theme}) => theme.hoverFilter})
  }
`

const Wrap = styled.div`
  width: clamp(35ch, 60%, 75ch);
  margin: 3rem auto 0rem;
  * {
    color: ${({theme}) => theme.textColor}
  }
  p {
    line-height: 1.5;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TitleH3 = styled.h3`
  font-size: 1.4rem;
  display: inline-block;
  margin-top: 5rem;
  position: relative;
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    background: ${({theme}) => theme.infoColor};
    width: 0;
    height: 1px;
    transition: .4s;
  }
  &:hover:after {
    width: 100%;
  }
`

export default GlobalStyles
export { Button, Wrap, Container, TitleH3 }
