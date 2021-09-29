import React from 'react'
import styled from '@emotion/styled'
import { Wrap, TitleH3 } from '../styles/GlobalStyle'

import { flash } from '../styles/animations.js'

const PageWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
`

const FlashMessage = styled(TitleH3)`
  font-size: 2rem;
  animation: ${flash} 1.2s ease-in alternate infinite;
`

const ErrorPage = ({ title }) => {
  return (
    <Wrap>
      <PageWrap>
        <h1>Oops!</h1>
        <FlashMessage>{title}</FlashMessage>
      </PageWrap>
    </Wrap>
  )
}

export default ErrorPage;
