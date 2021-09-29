import styled from '@emotion/styled'

const PostStyled = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  padding: .5rem;
  background: ${({theme}) => theme.foregroundColor};
  border-right: 1px solid ${({theme}) => theme.infoColor};
  border-bottom: 1px solid ${({theme}) => theme.infoColor};
  box-shadow: ${({theme}) => theme.boxShadow};
  border-radius: 0 0 .4rem 0;
  display: grid;
  grid-template-rows: 3rem 1rem 1rem auto;
  grid-template-columns: auto 3rem 3rem;
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    border-bottom: 3rem solid transparent;
    border-left: 5rem solid ${({theme}) => theme.bodyColor};
    transition: .4s;
  }
  &:hover:before{
    width: 5rem;
    height: 0rem;
    border-top: 2px solid ${({theme}) => theme.infoColor};
    border-left: 2px solid ${({theme}) => theme.infoColor};
  }

  .title {
    max-width: 100%;
    display: block;
    text-decoration: none;
    text-shadow: 1px 1px 3px ${({ theme }) => theme.infoColor};
    letter-spacing: 1px;
    font-weight: 500;
    cursor: pointer;
    font-size: 1.3rem;
    color: ${({theme}) => theme.titleColor};
    position: relative;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    justify-self: start;
  }
  .info {
    font-size: .8rem;
    color: ${({theme}) => theme.infoColor};
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;
    justify-self: flex-end;
  }
  .author {
    font-size: 1rem;
    color: ${({theme}) => theme.titleColor};
    grid-row-start: 3;
    grid-row-end: 4;
    grid-column-start: 1;
    grid-column-end: 4;
    align-self: center;
    justify-self: flex-start;
  }
  .content {
    grid-row-start: 4;
    grid-row-end: 5;
    grid-column-start: 1;
    grid-column-end: 4;
    overflow: hidden;
    text-overflow: hidden;
    letter-spacing: 2px;
    line-height: 1.5;
    margin: .5rem 1rem .5rem;
  }
  .edit, .delete {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
    justify-self: center;
    align-self: center;
    border: 1px solid ${({ theme }) => theme.infoColor};
    border-radius: .4rem;
    padding: .1rem .3rem;
    cursor: pointer;
    transition: .4s;
  }
  .delete {
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 3;
    grid-column-end: 4;
  }
  .edit:hover, .delete:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }

  .title:after {
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
  .title:hover:after {
    width: 100%;
  }
  @media screen and (max-width: 840px) {
    width: 100%;
    box-sizing: border-box;
    grid-template-rows: auto 1rem 1rem auto;
    grid-template-columns: auto 3rem 3rem;
    .info {
      justify-self: flex-end;
    }
  }
`

export default PostStyled