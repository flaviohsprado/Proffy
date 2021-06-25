import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

export interface Teacher{
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;        
    whatsapp: string;
}

interface TeacherItemProps{ //Crio uma interface que recebe uma propriedade teacher
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function createNewConnecion(){
        api.post('/connections', {
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={ teacher.avatar } alt={ teacher.name } />
                <div>
                    <strong>{ teacher.name }</strong>
                    <span>{ teacher.subject }</span>
                </div>
            </header>

            <p>{ teacher.bio }</p>

            <footer>
                <p>
                    Preço/Hora
                    <strong>{ teacher.cost }</strong>
                </p>
                <a 
                    target="_blank" //Abre em outra tela
                    onClick={createNewConnecion} 
                    href={`https://wa.me/${teacher.whatsapp}?text=Olá%20te%20encontrei%20no%20Proffy!%20Gostaria%20de%20marcar%20uma%20aula.%20Seria%20Possível?`}>

                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;