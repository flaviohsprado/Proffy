import React, { TextareaHTMLAttributes } from 'react';

import './styles.css'

//Ao invés de colocar atributo por atributto, chama esse TextareaHTMLAttributes que já possibilita usar todos os attr do Textarea
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string;
    name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => { //rest: pega todos os atributos restantes
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...rest} />
        </div>
    );
}

export default Textarea;