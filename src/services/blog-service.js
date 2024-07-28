const apiKata = 'https://blog.kata.academy/api/'

const postOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
}

export const getArticles = async (page = 1, token) => {
  const data = await fetch(
    `${apiKata}articles?limit=5&offset=${(page - 1) * 5}`,
    token
      ? {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Token ${token}`,
          },
        }
      : {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
  )
  if (!data.ok) console.log(data)
  return data.json()
}

export const getArticle = async (id, token) => {
  console.log('hello', id, token)
  const data = await fetch(
    `${apiKata}articles/${id}`,
    token
      ? {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Token ${token}`,
          },
        }
      : {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
          },
        }
  )
  if (!data.ok) console.log('ERRRROOOORRR')
  return data.json()
}

export const createNewArticle = async (token, article) => {
  const resolve = await fetch(`${apiKata}articles`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: { ...article } }),
  })
  if (resolve.ok) {
    const result = await resolve.json()
    return result
  }
  console.log('error')
  return {}
}

export const updateExistingArticle = async (token, article, slug) => {
  const resolve = await fetch(`${apiKata}articles/${slug}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: { ...article } }),
  })
  if (resolve.ok) {
    const result = await resolve.json()
    return result
  }
  console.log('error')
  return {}
}

export const deleteArticle = async (token, slug) => {
  const resolve = await fetch(`${apiKata}articles/${slug}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
  if (resolve.ok) {
    console.log('статья удалена')
    return {}
  }
  console.log('error')
  return {}
}

export const createNewUser = async (user) => {
  const resolve = await fetch(`${apiKata}users`, {
    ...postOptions,
    body: JSON.stringify({ user }),
  })
  if (!resolve.ok) {
    throw resolve
  }

  const result = await resolve.json()
  localStorage.setItem('user', JSON.stringify(result.user))
  return result.user
}

const getUserData = async (token) => {
  const resolve = await fetch(`${apiKata}user`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
  const result = await resolve.json()
  console.log(result)
  return result.user
}

export const userLogIn = async (data) => {
  const resolve = await fetch(`${apiKata}users/login`, {
    ...postOptions,
    body: JSON.stringify({ user: { ...data } }),
  })
  if (!resolve.ok) {
    throw new Error()
  }
  const result = await resolve.json()
  console.log(result)
  localStorage.setItem('user', JSON.stringify(result.user))
  const { user } = result
  return getUserData(user.token)
}

export const updateUserData = async (token, newData) => {
  const resolve = await fetch(`${apiKata}user`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: { ...newData } }),
  })
  if (!resolve.ok) throw new Error()
  const result = await resolve.json()
  return result
}

export const setFavorite = async (token, slug) => {
  console.log(`set${slug}`)
  const data = await fetch(`${apiKata}articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  if (!data.ok) {
    throw data
  }
  const response = await data.json()
  return response.article
}

export const removeFavorite = async (token, slug) => {
  console.log('remove')
  const data = await fetch(`${apiKata}articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  if (!data.ok) {
    throw data
  }
  const response = await data.json()
  return response.article
}
