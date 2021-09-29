import { keyframes } from '@emotion/react'

const drift = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  10% {
    opacity: 1;
    transform: translateX(-80px);
  }
  90% {
    opacity: 1;
    transform: translateX(80px);
  }
  100% {
    opacity: 0;
    transform: translateX(100px);
  }
`

const flash = keyframes`
  from { opacity: 1}
  to { opacity: 0}
`

export { flash, drift }