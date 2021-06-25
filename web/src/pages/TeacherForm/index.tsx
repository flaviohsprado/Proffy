import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    //Usa o UseState para o React verificar quando a variável foi alterada, para que possa clicar no botão e add um novo horário
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ]);

    //Conceito de imutabilidade, não podemos fazer alterações diretas nas variáveis de estado (UseState)
    //O segundo parâmetro do UseState é uma function que vai substituir os valores atuais que existe no array
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems, //Mantem o que já está no Schedule item
            { week_day: 0, from: '', to: '' } //Adiciona um novo item
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) { //Verifica se a posição que eu to alterando é a mesmo do for (map)
                return { ...scheduleItem, [field]: value } //sobrescreve o valor
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas!"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} //Faz um evento que ao digitar algo, grava no bagulho ai
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Ed. Física', label: 'Ed. Física' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Física', label: 'Física' },
                            ]}
                        />

                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                //Quando é criado um map, o primeiro elemento deve ter uma Key representando um valor unico em cada item
                                //Funciona como uma primary key, neste caso, não permitindo o usuário informar mais de um horário para
                                //o dia da semana
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Dia que Deus descançou' },
                                            { value: '1', label: 'Segunda-Feira' },
                                            { value: '2', label: 'Terça-Feira' },
                                            { value: '3', label: 'Quarta-Feira' },
                                            { value: '4', label: 'Quinta-Feira' },
                                            { value: '5', label: 'SEXTOUUUU' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;