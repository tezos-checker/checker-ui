import axios from 'axios'

export const checkerAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})
