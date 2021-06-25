import React, { InputHTMLAttributes } from 'react';

import './styles.css'

//Ao invés de colocar atributo por atributto, chama esse InputHTMLAttributes que já possibilita usar todos os attr do input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => { //rest: pega todos os atributos restantes
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;