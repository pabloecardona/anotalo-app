import './styles.css'
import React, { useState, useEffect } from 'react'
import { Note } from './Components/Note.js'
import LoginForm from './Components/LoginForm'
import NoteForm from './Components/NoteForm'
import { getAllNotes, createNote, setToken } from './services/notes'

const phrase = [
  'Mientras te tomás un feca ☕',
  'Y que se hagan agua los helados 🍧',
  'Porque seguro te lo olvidás 🙄',
  'Y quedate piola 🤨',
  'Para leerlo más tarde 🕶',
  'Y andá a dormir tranqui 😴'
]

const Message = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < phrase.length - 1) {
          // console.log(Math.round(Math.random() * (phrase.length - 1)));
          return prevCount + 1
        }
        return 0
      })
    }, 4000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <div className='header'>
      <h1>Anotalo</h1>
      <p>{phrase[count]}</p>
    </div>
  )
}

export default function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllNotes().then((notes) => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  const addNote = (noteToAdd) => {
    createNote(noteToAdd).then((note) => {
      setNotes((prevNotes) => [...prevNotes, note])
    })
  }

  // cuando cerramos sesión ponemos null el user y el token de las notas. Además eliminamos la info guardada en localStorage
  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const setAppUser = (user) => {
    setUser(user)
  }

  // const handleUsername = ({ target }) => {
  //   setUsername(target.value)
  // }

  // const handlePassword = ({ target }) => {
  //   setPassword(target.value)
  // }

  // const renderLoginForm = () => {
  //   return (
  //     <form onSubmit={handleLoginSubmit} className='loginForm'>
  //       <input type='text' value={username} name='username' placeholder='Usuario' onChange={handleUsername} />
  //       <input type='password' value={password} name='password' placeholder='Contraseña' onChange={handlePassword} />

  //       <button>Iniciar Sesión</button>
  //       <Notification message={errorMessage} />
  //     </form>
  //   )
  // }

  return (
    <div className='App'>
      <Message />

      {user /* Si existe un user entonces muestra el form para crear notas, sino el form de login */
        ? <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
        : <LoginForm
            setAppUser={setAppUser}
          />}

      {loading ? 'Recordando notas... 🤔' : ''}

      <ul>
        {notes.map((note) => (
          <Note key={note.id} content={note.content} />
        ))}
      </ul>

    </div>
  )
}
