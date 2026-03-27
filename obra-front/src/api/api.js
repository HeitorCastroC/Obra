import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getUsers  = ()       => api.get('/users')
export const getWorks  = ()       => api.get('/works')
export const getEntries = (userId) => api.get(`/entries/user/${userId}`)
export const getFavorites = (userId) => api.get(`/entries/user/${userId}/favorites`)
export const createWork  = (data)            => api.post('/works', data)
export const createEntry = (data)            => api.post('/entries', data)