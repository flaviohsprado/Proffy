import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    //Lista
    async index(request: Request, response: Response) {
        const filters = request.query;

        //Faz a definição das propriedades
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        //Se o caboclo não informou o dia ou matéria ou horário
        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Não foram informados filtros para pesquisa!'
            })
        }
        
        //converte a hora que vem do filtro
        const timeInMinutes = convertHourToMinutes(time);
        
        //realiza as filtragens
        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                //Isso aqui é uma putaria, mas basicamente é um join (importante colocar cràse)
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                //?? representa um parâmetro, [] valor do parâmetro em array
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    //Insere
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        //cria uma transação com o banco
        const trx = await db.transaction();
    
        try {
            //Cria uma variável já guardando os Id's retornados ao realizar o insert     
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
    
            const user_id = insertedUsersIds[0];
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
    
            const class_id = insertedClassesIds[0];
    
            //Como o schedule é um array, é feito uma conversão desse objeto para que o banco entenda
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
    
            await trx('class_schedule').insert(classSchedule);
    
            await trx.commit();
    
            return response.status(201).send();
    
        } catch (ex) {
            trx.rollback();
    
            return response.status(400).json({
                error: 'Ocorreu um erro inesperado ao criar uma nova Aula! ' + ex
            })
        }
    }
}