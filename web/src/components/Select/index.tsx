import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

//Ao invés de colocar atributo por atributto, chama esse SelectHTMLAttributes que já possibilita usar todos os attr do Select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    //Defino a propriedade Options e o que ela é, no caso, um Array de objetos
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => { //rest: pega todos os atributos restantes
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>            
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>

                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    );
}

export default Select;