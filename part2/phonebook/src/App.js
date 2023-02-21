import { useState, useEffect } from "react";
import phonebookService from "./Phonebook";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearch] = useState("");
  const [tip, setTip] = useState(null);

  const personToShow = persons.filter(
    (person) =>
      searchName === "" ||
      person.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
  );

  const notificate = (type, message) => {
    setTip({ type, message });
    setTimeout(() => setTip(null), 5000);
  };

  const deletePerson = (person) => {
    phonebookService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        notificate(
          false,
          `Information of ${person.name} has already been removed from server`
        );
      });
  };

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification tip={tip}></Notification>
      <div>
        filter shown with
        <input
          value={searchName}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <h3>add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        notificate={notificate}
      ></PersonForm>

      <h2>Numbers</h2>
      {personToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson}
        ></Person>
      ))}
    </div>
  );
};

const PersonForm = ({ persons, setPersons, notificate }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let p;
    if ((p = persons.find((p) => p.name === newName)) != null) {
      if (newNumber === p.number) {
        alert("find the same pair of name and number");
        return;
      }

      const tip = `${p.name} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(tip)) {
        const changedPerson = { ...p, number: newNumber };
        phonebookService.update(p.id, changedPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== p.id ? person : changedPerson
            )
          );
          notificate(true, changedPerson.name);
        });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    phonebookService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        notificate(true, newPerson.name);
      })
      .catch((e) => console(e));

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
const Person = ({ person, person: { id, name, number }, deletePerson }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (window.confirm(`Delete ${name} ?`)) deletePerson(person);
  };
  return (
    <>
      <p>
        {name} {number}
        <button onClick={handleClick}>delete</button>
      </p>
    </>
  );
};

const Notification = ({ tip }) => {
  if (tip == null) return null;

  return <div className={tip.type ? "finish" : "error"}>{tip.message}</div>;
};
export default App;
