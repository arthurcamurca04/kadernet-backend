import { Response, Request } from 'express';
import db from '../database/connection';
import bcrypt from 'bcrypt';

const saltRounds = 10;


const UserController = {
    create: async (request: Request, response: Response) => {

        const {
            name,
            email,
            password
        } = request.body;

        if(name == "" || email == "" || password == ""){
            return response.status(400).json({ error: "Preencha os campos corretamente"});
        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return response.status(500).send({ error: err });
            }

            const trx = await db.transaction();
            try {
                await trx('users').insert({
                    name,
                    email,
                    password: hash
                });
                await trx.commit();
                return response.status(201).send();
            } catch (error) {
                trx.rollback();
                return response.status(400).json({ error: "Erro inesperado no servidor"});
            }
        });
    }

}

export default UserController;