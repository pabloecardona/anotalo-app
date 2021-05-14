import './styles.css'
import React, { useState, useEffect } from 'react'
import { Note } from './Notes.js'
import { getAllNotes } from './services/notes/getAllNotes'
import { createNote } from './services/notes/createNote'

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
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAllNotes().then((notes) => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteToAdd = {
      title: newNote,
      body: newNote
    }

    createNote(noteToAdd).then((note) => {
      setNotes((prevNotes) => [...prevNotes, note])
    })

    setNewNote('')
  }

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div className='App'>
      <Message />
      <form onSubmit={addNote} className='form'>
        <input value={newNote} onChange={handleNewNote} />
        <button type='submit'>Agregar nota</button>
      </form>
      {loading ? 'Cargando...' : ''}
      <ul>
        {notes.map((note) => (
          <Note key={note.id} title={note.title} body={note.body} />
        ))}
      </ul>
    </div>
  )
}
