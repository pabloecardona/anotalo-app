import axios from 'axios'
const baseUrl = 'https://pec-api-notes.herokuapp.com/api/login'
// const baseUrl = 'http://localhost:3001/api/login'
const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
