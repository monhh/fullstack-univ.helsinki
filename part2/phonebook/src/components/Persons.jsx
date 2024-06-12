import Person from "./Person"

const Persons = ({filteredPersons, deletePerson}) => {
    return (
        <div>
            {filteredPersons.map(person =>

                <Person 
                    key={person.name} 
                    name={person.name} 
                    number={person.number} 
                    deletePerson={() => deletePerson(person.id)}
                />

            )}
        </div>
    )
}
export default Persons