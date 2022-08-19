import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import SubmitForm from './components/submitForm';
import Person from './components/renderPerson';
import peopleService from './services/people';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    peopleService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

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
      // alert(`${newName} is already added to phonebook`);
      const existingPerson = persons.find((p) => p.name === personObject.name);

      const changedPerson = { ...existingPerson, number: newNumber };

      peopleService
        .update(changedPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== changedPerson.id ? person : returnedPerson
            )
          );
        })
        .then(() => {
          setMessage(`Updated number of ${changedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${changedPerson.name} has already been deleted from the server`
          );
          setPersons(persons.filter((p) => p.id !== changedPerson.id));
        });
    } else {
      peopleService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      peopleService
        .deletePerson(person.id)
        .then(() => setPersons(persons.filter((p) => p.id !== person.id)));
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
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
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
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person)}
        />
      ))}
    </div>
  );
};

export default App;
