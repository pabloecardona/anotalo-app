import axios from 'axios'

export const createNote = (noteToAdd) => {
  return axios
    .post('https://jsonplaceholder.typicode.com/posts', noteToAdd)
    .then(({ data }) => {
      return data
    })
}
