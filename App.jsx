import "./App.css";

import { useState, useEffect } from 'react';

function App() {
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = () => {
    fetch('/getAnimals')
      .then(response => response.json())
      .then(data => setAnimals(data));
  };

  const handleAddAnimal = (e) => {
    e.preventDefault();

    fetch('/addAnimal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, species, age }),
    })
      .then(response => response.json())
      .then(animal => {
        console.log('Added Animal:', animal);
        loadAnimals();
      });
  };

  return (
    <div>
      <h1>Animal Shelter App</h1>

      <form onSubmit={handleAddAnimal}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} autoComplete="none" onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="species">Species:</label>
        <input type="text" id="species" value={species} autoComplete="none" onChange={(e) => setSpecies(e.target.value)} required />

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} autoComplete="none" onChange={(e) => setAge(e.target.value)} />

        <button type="submit">Add Animal</button>
      </form>
      <button type="submit">Show Animal</button>
      <ul>
        {animals.map(animal => (
          <li key={animal.animalid}>
            {`${animal.name} (${animal.species}) - Age: ${animal.age} - Added Time: ${animal.createdat}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

