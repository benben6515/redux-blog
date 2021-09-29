import React from 'react'
import styled from '@emotion/styled'
import { Wrap, TitleH3 } from '../styles/GlobalStyle'

const PageWrap = styled(Wrap)`
  width: 100%;
  padding: 2rem 0;
`

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-end;
`

const HomePage = () => {
  return (
    <Wrap>
      <PageWrap>
        <TitleH3>關於我：</TitleH3>
        <p>嗨嗨！我是 Benben &#128075; </p>
        <p>這是一個黑白為主色的部落格，並可以切換黑白主題。</p>
        <p>我在這裡錄記人生黑白無常的那些時刻...</p>
        <Container>
          <TitleH3>你知道嗎</TitleH3>
          <p>RGB一般稱為【色光三原色】</p>
          <p>R（red）紅、G（green）綠、B（blue）藍，顏色階調為 0-255</p>
          <p>如果把三個色階加來除以 3 並把 RGB 指定成同樣的數字就可以把顏色變黑白</p>
          </Container>
      </PageWrap>
    </Wrap>
  )
}

export default HomePage;
