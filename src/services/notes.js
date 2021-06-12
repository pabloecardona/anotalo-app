import axios from 'axios'
const baseUrl = 'https://pec-api-notes.herokuapp.com/api/notes'
// const baseUrl = 'http://localhost:3001/api/notes'

// creamos una variable para almacenar el token y no tener que estar pasándoselo cada vez que queremos trabajar con las notas
let token = null

// creamos una función para que cree el token a enviar a partir del token recibido
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createNote = (noteToAdd) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios
    .post(baseUrl, noteToAdd, config)
    .then(({ data }) => {
      return data
    })
}

const getAllNotes = () => {
  return axios
    .get(baseUrl)
    .then(({ data }) => {
      return data
    })
}

export { getAllNotes, createNote, setToken }
