import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`,
    },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  console.log(response)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
  return response.data
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config())
}

export default { getAll, create, update, remove }
