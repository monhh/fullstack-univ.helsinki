import { useState } from 'react'
import Note from './components/Person'

const AppFiltering = (props) => {
	const [notes, setNotes] = useState(props.notes)
	//state for storing the user-submitted input and let's set it as the input element's value attribute
	const [newNote, setNewNote] = useState('a new note...') //the initial value of the input element
	//keeps track of which notes should be displayed:
	const [showAll, setShowAll] = useState(true)
  

  const addNote = (event) => {
	event.preventDefault()
	//new object for the note called noteObject that will receive its content from the component's newNote state.
	const noteObject = {
		content: newNote,
		important: Math.random() < 0.5,
		id: notes.length + 1,
	}
	setNotes(notes.concat(noteObject))
	setNewNote('')
  }
  //The target property of the event object now corresponds to the controlled input element, 
  //and event.target.value refers to the input value of that element.
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  //stores a list of all the notes to be displayed in the notesToShow
  //The items on the list depend on the state of the component
  const notesToShow = showAll
    ? notes
    // : notes.filter(note => note.important === true) 
	: notes.filter(note => note.important)
 
  return (
    <div>
		<h1>Notes</h1>
		<div>
			<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all' }
			</button>
		</div>
		<ul>
			{notesToShow.map(note => 
				<Note key={note.id} note={note} />
			)}
		</ul>
		{/* Since we assigned a piece of the App component's state as the value attribute of the input element, 
		the value of the App component now controls the behavior of the input element.
		To enable editing of the input element, we have to register an event handler 
		that synchronizes the changes made to the input with the component's state: */}
		<form onSubmit={addNote}>
			<input 
				value={newNote}
				onChange={handleNoteChange}//event handler is called every time a change occurs in the input element
			/>
			<button type="submit">save</button>
		</form> 

    </div>
  )
}
export default AppFiltering 