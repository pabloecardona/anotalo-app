import { useState } from 'react'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')

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
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <input value={newNote} onChange={handleChange} placeholder='Escribí tu nota acá' />
        <button type='submit'>Agregar nota</button>
      </form>
      <span>
        <button onClick={handleLogout}>Salir</button>
      </span>
    </>
  )
}
