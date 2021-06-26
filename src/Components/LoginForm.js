/* eslint-disable camelcase */
// formulario de inicio de sesión. Se encarga de corroborar si el usuario y la contraseña son correctos
// en caso de serlo almacena de forma local el token y además se lo pasa al componente del formulario de notas para que al
// crear una nota ya tenga el token. Además le pasa la información del usuario a la app para que lo guarde en su estado
// y esté disponible para otros componentes también

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Notification } from './Notification'
import Togglable from './Togglable'
import { setToken } from '../services/notes'
import loginService from '../services/login'

const no_op = () => {}

export default function LoginForm ({ setAppUser = no_op }) {
  const [errorMessage, setErrorMesage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser') // leemos la info del usuario logueado guardada en el localstorage
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setAppUser(user)
      setToken(user.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ // le pasamos a la función login las credenciales. En este caso como los nombres
        // de las credenciales son los mismos lo dejamos así sino se lo tendríamos que cambiar
        // para que coincida con lo que espera la api
        username,
        password
      })

      // almacenamos la info del user en localStorage para usarla luego para mantener la sesión iniciada
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setToken(user.token) // le pasamos el token para que el servicio de las notas ya lo tenga y lo use cada vez que lo necesite
      setAppUser(user) // seteamos los datos del usuario con lo que nos responde la api al loguearse (responde name, username y token)
      setUsername('') // reseteamos el username, total ya estamos logueados
      setPassword('') // reseteamos la password total ya estamos logueados
    } catch (e) {
      setUsername('') // reseteamos el username
      setPassword('') // reseteamos la password
      setErrorMesage('Usuario o contraseña incorrectos')
      setTimeout(() => { // luego de un tiempo eliminamos el mensaje de error
        setErrorMesage(null)
      }, 5000)
    }
  }

  return (
    <Togglable showButtonLabel='Iniciar sesión' hideButtonLabel='Cancelar'>
      {' '}
      {/* para hacer el form de login visible o no visible */}
      <form onSubmit={handleSubmit} className='loginForm'>
        <input
          type='text'
          value={username}
          name='username'
          placeholder='Usuario'
          onChange={handleUsernameChange}
        />
        <input
          type='password'
          value={password}
          name='password'
          placeholder='Contraseña'
          onChange={handlePasswordChange}
        />

        <button>Iniciar Sesión</button>
        <Notification message={errorMessage} />
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  setAppUser: PropTypes.func.isRequired
}
