const { REACT_APP_BASE_URL:BASE_URL } = process.env

// post APIs ------------------------------
const getPostsAPI =  async (page, perPageItem) => {
  try {
    const res = await fetch(`${BASE_URL}/posts?_expand=user&_sort=createdAt&_order=desc&_page=${page}&_limit=${perPageItem}`)
    const data = await res.json()
    const link = await res.headers.get('link')
    const lastPage = link.slice(link.lastIndexOf('page=') + 5,link.lastIndexOf('&'))
    return { data, lastPage }
  }
  catch (err) {
    throw err
  }
}

const getPostAPI =  async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}?_expand=user`)
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const getUserPostsAPI = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}?_embed=posts&_sort=createdAt&_order=desc`)
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const addPostAPI = async (token, title, body) => {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        body,
      })
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const updatePostAPI = async (postId, token, title, body) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        body,
      })
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const deletePostAPI = async (postId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}


// user APIs ------------------------------
const registerAPI = async (nickname, username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        nickname,
        username,
        password
      })
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const loginAPI = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}

const getMeAPI = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
    const json = await res.json()
    return json
  }
  catch (err) {
    throw err
  }
}


export { getPostsAPI, getPostAPI, getUserPostsAPI, addPostAPI, updatePostAPI, deletePostAPI }
export { registerAPI, loginAPI, getMeAPI }
