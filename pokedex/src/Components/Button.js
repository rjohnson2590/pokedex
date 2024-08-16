import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Button=(props)=> {
    
    return(
        <button onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;