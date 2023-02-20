import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearch] = useState("");

  const personToShow = persons.filter(
    (person) =>
      searchName === "" ||
      person.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={searchName}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h2>Numbers</h2>
      {personToShow.map((person) => (
        <Person key={person.name} person={person}></Person>
      ))}
    </div>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((p) => p.name === newName) != null) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const Person = ({ person: { name, number } }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};
export default App;
