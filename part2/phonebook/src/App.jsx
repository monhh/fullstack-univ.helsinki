import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
	//States for (user-submitted) inputs 
	//store value of the (user-submitted) input 
	//and let's set it as the input element's value attribute
	const [newName, setNewName] = useState('') 
	const [newNunber, setNewNumber] = useState('') 
	const [filterName, setFilterName] = useState(''); 

	//array of persons 
	const [persons, setPersons] = useState([]) 

	const [phoneBookMessage, setPhoneBookMessage] = useState({message: null, isError: false});

	//useEffect GET setPersons-----------------------
	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})

	}, [])
	
	//setPersons Update & Post and nameObject-----------------------------------------------------------
	const addPerson = (event) => {
		event.preventDefault()
		//setPersons Update -------------------------------------------------------------------------
		const existingPerson = persons.find(person => person.name === newName);
		if (existingPerson) {
			const confirmUpdate = window.confirm(
				`${newName} is already added to phonebook, replace the old number number?`
			);
			if (confirmUpdate) {
				const updatedPerson = { ...existingPerson, number: newNunber };
				personService
					.update(existingPerson.id, updatedPerson)
					.then(returnedPerson => {
						setPersons(persons
							.map(person => (person.id !== existingPerson.id ? person : returnedPerson)))
						
						setPhoneBookMessage({
							message: `Number of ${updatedPerson.name}  is changed to ${updatedPerson.number}`,
							isError: false
						});
						setTimeout(() => {setPhoneBookMessage({message: null, isError: false})}, 5000)

						setNewName('');
						setNewNumber('');
					})
					.catch(error => {
						setPhoneBookMessage({
							message: `Information of ${updatedPerson.name} has already been removed from server`,
							isError: true
						});
						setTimeout(() => {setPhoneBookMessage({message: null, isError: false})}, 5000)
						setPersons(persons
							.filter(person => person.id !== existingPerson.id))
					});
			}
			return;
		}

		//object for the person called nameObject that will receive its content from the component's states
		const nameObject = {
			name: newName,
			number: newNunber,
		}

		//setPersons Post -------------------------------
		personService
			.create(nameObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))

				setPhoneBookMessage({
					message: `Added ${returnedPerson.name}`,
					isError: false
				});
				setTimeout(() => {setPhoneBookMessage({message: null, isError: false})}, 5000)

				setNewName('')
				setNewNumber('')
			})
	}

	//setNewName --------------------------------------------------------
	const handlePersonChange = (event) => {
		if (persons.map(person => person.name).includes(event.target.value)) {
			console.log(`${event.target.value} is already added to phonebook`)	
		}
		setNewName(event.target.value)
	}

	//setNewNumber --------------------------------------------------------
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	//Filter -----------------------------------------------------------
	//setFilterName -------------------------------
	const handleFilterChange = (event) => {
		setFilterName(event.target.value);
	};
	//filterName ---------------------------------------------------
	const filteredPersons = persons.filter(person =>
		person.name.toLowerCase().includes(filterName.toLowerCase())
	);

	//deletePerson --------------------------------------------------------
	const deletePerson = (id) => {
		const confirmDelete = window.confirm('You want to delete this person?')

		if (confirmDelete) {
			personService.deletePerson(id).then(() => {
				setPersons(persons.filter(person => person.id !== id))
			})
		}
	}	
	
	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={phoneBookMessage} />

			<Filter filterName={filterName} handleFilterChange={handleFilterChange} />

			<h2>Add a new</h2>
			<PersonForm
				addPerson={addPerson}
				newName={newName}
				handleNameChange={handlePersonChange}
				newNumber={newNunber}
				handleNumberChange={handleNumberChange}
			/>

			<h2>Numbers</h2>		
			<Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>

		</div>
	)
}
export default App 