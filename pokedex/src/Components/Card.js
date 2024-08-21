import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Card.css';

const Card=(props)=> {
    const [img, setImg] = useState('');
    const [backimg, setBackimg] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
    const [errorcheck, setErrorCheck] = useState(false);
    let typesList = [];

    useEffect(() => {
        axios.get(props.url)
            .then((res) => {
                console.log('res', res)
                setImg(res.data.sprites.front_default);
                setBackimg(res.data.sprites.back_default);
                setWeight(res.data.weight);
                setHeight(res.data.height);
                setStats(res.data.stats);
                const TypesArray = res.data.types;
                TypesArray.map((type) => {
                    typesList.push(type.type.name);
                    return type;
                });
                setTypes(typesList);
                console.log('here', props.name)
            })
            .catch((error) => {
                console.log(error);
                setErrorCheck(true);
            })
    }, [props.url]);
    return(
        <div className='card-container'>
            <a onClick={props.click}>
         <p className='card-item' key={props.index}>{props.name}-<img src={img}/></p>
            <p>weight - {weight}</p>
            <p>height - {height}</p>
            {types.length > 1 ?
                <p>{types[0]}, {types[1]}</p>
                :
                <p>{types[0]}</p>
            }
            </a>
         </div>
    );
}

export default Card;