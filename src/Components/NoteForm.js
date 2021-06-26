import { useRef, useState } from 'react'
import Togglable from './Togglable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = ({ target }) => {
    setNewNote(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteToAdd = {
      content: newNote
    }

    addNote(noteToAdd)
    setNewNote('')
    // acá deberíamos llamar a la función que oculte el form
    togglableRef.current.toggleVisibility()
  }

  return (
    <>
      <Togglable showButtonLabel='Nueva nota' hideButtonLabel='Cancelar' ref={togglableRef}>
        <h3>Creando una nueva nota</h3>
        <form onSubmit={handleSubmit} className='form'>
          <input value={newNote} onChange={handleChange} placeholder='Escribí tu nota acá' />
          <button type='submit'>Agregar nota</button>
        </form>
      </Togglable>
      <div>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </>
  )
}
