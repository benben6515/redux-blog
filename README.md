### 這一個 React / Redux 做的部落格

[demo](https://benben6515.github.io/redux-blog)

### 功能
1. 登入頁面：輸入帳號密碼後可以登入
2. 註冊頁面：可以開放使用者註冊
3. About 頁面：簡單關於部落格的話
3. 404 頁面：如果網址有誤會跑到 404 頁面
4. 文章列表頁面：可以看到所有文章，一頁只會顯示 5 筆，需要支援分頁功能，可以換頁
5. 單篇文章頁面：點進去文章以後可以看到文章完整內容
6. 發表文章頁面：可以輸入標題跟內文發文
7. 刪除文章：只有同一個使用者才可以刪除文章
8. 編輯文章：只有同一個使用者才可以編輯文章，編輯完跳回單一文章頁面
9. 單一使用者的所有文章頁面：查看某一個使用者的所有文章

### 使用技術
- react 
- react-router-dom
- redux
- redux toolkit
- redux thunk 串接 API
- emotion/styled

### 部分截圖

- 導覽列
![](https://i.imgur.com/C9QegVa.gif)

- 主題、登入、編輯功能
![](https://i.imgur.com/s43QSso.gif)

- 分頁、刪除、登出功能
![](https://i.imgur.com/KK5hzti.gif)

### Source tree
```
📦src
 ┣ 📂app
 ┃ ┗ 📜store.js
 ┣ 📂components
 ┃ ┣ 📜Blog.js
 ┃ ┣ 📜Footer.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜Nav.js
 ┣ 📂features
 ┃ ┣ 📂post
 ┃ ┃ ┗ 📜postSlice.js
 ┃ ┗ 📂user
 ┃ ┃ ┗ 📜userSlice.js
 ┣ 📂images
 ┃ ┗ 📜day_night_icon.svg
 ┣ 📂pages
 ┃ ┣ 📜AboutPage.js
 ┃ ┣ 📜ErrorPage.js
 ┃ ┣ 📜HomePage.js
 ┃ ┣ 📜LoadingPage.js
 ┃ ┣ 📜OnePostPage.js
 ┃ ┣ 📜PostPage.js
 ┃ ┣ 📜UserPage.js
 ┃ ┗ 📜UserPostsPage.js
 ┣ 📂styles
 ┃ ┣ 📜animations.js
 ┃ ┣ 📜GlobalStyle.js
 ┃ ┣ 📜PostStyled.js
 ┃ ┗ 📜theme.js
 ┣ 📜index.js
 ┣ 📜localStorageAPI.js
 ┗ 📜webAPI.js
📜.env
```
