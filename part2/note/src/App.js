import Note from './components/Note'
import { useState } from 'react'

//将页面中可变数据想成一个状态，将这个状态和组件绑定，再通过组件事件来修改这个状态
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNotes] = useState('input a new note...')
  const [showAll, setShow] = useState(true)
  let notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const addNote = (event) => {
    //防止提交表单的默认操作
    event.preventDefault()
    console.log('button click', event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject))
    setNewNotes('')
  }
  const handleChange = (event) => {
    console.log(event.target.value)
    setNewNotes(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShow(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
