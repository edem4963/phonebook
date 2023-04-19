import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookContact from './contact/phonebook'

 const Persons = (props) => {
      return (
        <div>
          {props.persons}
        </div>
        
      )
} 
const PersonForm  = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input 
                    value={props.nameValue}
                    onChange={props.nameChange} 
                />
        </div>
        <div>
          number: <input 
                    value={props.numberValue}
                    onChange={props.numberChange} 
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

/* const Input = () => {
  
} */
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='add'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] =  useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [addMessage, setAddMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    phonebookContact
    .getAll()
    .then(initialContact => {
      setPersons(initialContact)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const x = newName
    const y = persons.find(p => p.name === x)
    if (y !== undefined ){
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

    phonebookContact
    .create(nameObject)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setAddMessage(
          `Added '${nameObject.name}'`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
        setNewName('')
      setNewNumber('')
    })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleteContact = (id) =>{
    console.log('The key named ' + id + ' is picked')
    const url = `http://localhost:3001/persons/${id}`
    
    axios.delete(url)
      setPersons(persons.filter((response) =>  response.id !== id))
    

    //axios.delete(url)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addMessage} />
      <PersonForm 
        onSubmit={addName}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons.map(p => <p key={p.name}>{p.name} {p.number} <button onClick={()=> deleteContact(p.id) }>delete</button> </p>)} />
    </div>
  )
}

export default App
