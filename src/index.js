import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/react'
import { Provider } from 'react-redux'

import GlobalStyle from './styles/GlobalStyle'
import Blog from './components/Blog.js';
import { store } from './app/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={css`${GlobalStyle}`} />
      <Blog />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
