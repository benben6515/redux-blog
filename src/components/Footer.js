import styled from '@emotion/styled'

const FooterWrap = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
  height: 1.6rem;
  line-height: 1.6rem;
  padding: auto;
  bottom: 0;
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.textColor};
`

const Footer = () => {
  return (
    <FooterWrap>
      Copyright &copy; 2021 Benben All rights reserved.
    </FooterWrap>
  )
}

export default Footer