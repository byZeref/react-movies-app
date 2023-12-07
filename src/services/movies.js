const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
import axios from "axios"

export const fetchMovies = async (search) => {
  const instance = axios.create({ baseURL: API_URL })
  const params = {
    apikey: API_KEY,
    s: search
  }

  const data = await instance.get('/', {
    params,
  }).catch(e => {
    console.log('axios error', e)
    return Promise.reject(e)
  })

  // const data = await new Promise((resolve, reject) => {
  //   fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`)
  //     .then(res => {
  //       console.log('res', res)
  //       resolve(res.json())
  //     })
  //     .catch(e => {
  //       console.log('error', e)
  //       reject(e)
  //     })
  // })
  
  return data
}


