import { Request, Response} from "express";
import db from "../database/connection";

const AnnotationsController = {

    async index(request: Request, response: Response){
        const { user_id } = request;

        try {
            const users = await db('annotations')
                .select('*')
                .where('user_id', '=', user_id);
            
            return response.status(200).json({users});
        } catch (error) {
            return response.status(401).json({
                message: 'Falha ao inserir anotação', 
                error: error});
        }
    },

    async create(request:Request, response:Response){

        const {user_id} = request;
        const {
            title, 
            value,
            isToReceive,
            date
        } = request.body;

        const trx = await db.transaction();
        try {
            await trx('annotations').insert({
                title,
                value,
                isToReceive,
                date,
                user_id
            });

            trx.commit();
            return response.status(201).send('Anotação inserida com sucesso');
        } catch (error) {
            trx.rollback();
            return response.status(401).send('Falha ao inserir anotação');
        }
    }
}

export default AnnotationsController;