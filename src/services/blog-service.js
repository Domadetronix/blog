const apiKata = 'https://blog.kata.academy/api/'

const postOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
}

export const getArticles = async (page = 1) => {
  const data = await fetch(`${apiKata}articles?limit=5&offset=${(page - 1) * 5}`)
  if (!data.ok) console.log(data)
  return data.json()
}

export const getArticle = async (id) => {
  const data = await fetch(`${apiKata}articles/${id}`)
  if (!data.ok) console.log('ERRRROOOORRR')
  return data.json()
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
    throw resolve
  }

  const result = await resolve.json()
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
  const result = await resolve.json()
  return result
}
