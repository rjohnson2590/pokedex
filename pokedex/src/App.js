import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Button from './Components/Button';
import Card from './Components/Card';
function App() {
  const [query, setQuery] = useState([]);
  const [currentNum, setCurrentNum]=useState(0)
  const [currnet, setCurrnet] = useState('https://pokeapi.co/api/v2/pokemon/?limit=40');
  const [next, setNext]= useState('');
  const [prev, setPrev]= useState('');
  const [offset, setOffset]= useState(0)
  const [showModal, setShowModal]= useState(false)
  const [modalPoke, setModalPoke] = useState({})
  function callPokeapi(val){ 
    console.log(val)
    console.log('next',next);
    axios.get(val)
      .then(function (response) {
        // handle success
        console.log(response.data); 
       
        setQuery(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  function callPokeapiPage(){ 
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40&offset=')
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

  function showModalFunc(poke){
    console.log('poke',poke)
    let val =showModal;
    setShowModal(!val);
    setModalPoke(poke)
  }
  return (
    <div className="App">
      <div className={showModal? "modal-true" : ""}>
      <header className="App-header">
        <img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/16.png"} className="App-logo" alt="logo" />
        </header>
        <Button onClick={()=>callPokeapi(currnet)} text={"Get pokemon"}/>
        <div className='pokemon-list-wrapper'>
          {query.map((pokemon, index) => {
                          let name = pokemon.name;
                          console.log('pokemon', pokemon)
                          return <Card key={index} name={name} url={pokemon.url} click={() => showModalFunc(pokemon)}/>
              })}
        </div>
       
       <div>
       <Button onClick={()=>callPokeapi(prev)} text={"Previos"}/>
       <Button onClick={()=>callPokeapi(next)} text={"Next"}/>
       </div>
       </div>
      {showModal ? <div className="modal-container"><Card index={1} name={modalPoke.name} url={modalPoke.url}/></div> : <></>}
    </div>
  );
}

export default App;
