import { Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import db from "../database/connection";

const LoginController = {

    login: async (request: Request, response: Response) =>{

        const {email, password} = request.body;
        if(email == "" || password == "") return response.status(400).json({error: "Preencha os campos corretamente"})
        const users = await db('users').where('email', '=', email);

        if(users.length != 0){
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(err){
                    return response.status(401).json({error: "Falha na autenticação"});
                }

                if(result){
                    const token = jwt.sign({
                        id: users[0].id,
                        name: users[0].name

                    }, 'secret', {
                        expiresIn: '86400'
                    })
                    return response.status(200).json({
                        msg: "Usuário autenticado com sucesso",
                        token: token
                    })
                }

                return response.status(401).json({error: "Falha na autenticação"});                
            })
        }else{
            return response.status(401).json({error: "Falha na autenticação"});
        }
    }
}

export default LoginController;