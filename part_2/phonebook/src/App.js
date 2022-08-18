import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import SubmitForm from './components/submitForm';
import Person from './components/renderPerson';

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  // ]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const hook = () => {
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const peopleToShow =
    filter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,

      id: persons.length + 1,
    };
    if (persons.some((obj) => obj.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3> Add a new </h3>
      <SubmitForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
