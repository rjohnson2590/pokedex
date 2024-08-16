import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Button from './Components/Button';
import Card from './Components/Card';
function App() {
  const [query, setQuery] = useState([]);
  function callPokeapi(){
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40')
      .then(function (response) {
        // handle success
        console.log(response.data.results); 
        setQuery(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/16.png"} className="App-logo" alt="logo" />
        <Button onClick={callPokeapi} text={"Get pokemon"}/>
        <div>
        {query.map((pokemon, index) => {
                        let name = pokemon.name;
                        console.log('pokemon', pokemon)
                        return <Card key={index} name={name} url={pokemon.url} />
            })}
            </div>
       
      </header>
    </div>
  );
}

export default App;
