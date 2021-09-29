import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const LoadingStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  font-size: 2rem;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${({theme}) => theme.bodyColor};
  background: ${({theme}) => theme.loadingColor};
  backdrop-filter: blur(2px);
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 60%;
    transform: translate(-50%, -50%);
    background: transparent;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    border: 5px dashed ${({theme}) => theme.bodyColor};
    animation: ${rotate} 1s linear infinite;
  }
`

const LoadingPage = () => {
  return (
    <LoadingStyled>
      Loading...
    </LoadingStyled>
  )
}

export default LoadingPage