
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'

import { loginUsuário, encrypt } from '../../../models/usuario';
//import db from '../../../services/db';


export default async function Login(req: NextApiRequest, res: NextApiResponse){
    const {usuário, senha} = req.body;

    /*if(usuário === "tiago.salgado@devsoftbr.com" && senha === "@Abab232524"){
        const DB = await db();

        var sql = 'INSERT INTO usuarios (user, senha, nome, email, id_empresa, id_tipo_acesso, id_permissao) VALUES ("tiago.salgado", "'+ encrypt(senha) +'", "Tiago Salgado", "tiago.salgado@devsoftbr.com", 1, 1, 1)'
        DB.query(sql, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.json({
                    "id": 1,
                    "nome": "Tiago",
                    "razao_social": "Tiago",
                    "cnpj": "123456789",
                    "email": usuário
                })
            }
        })
    }*/
    
    var usuárioL = await loginUsuário(usuário, senha);

    if(usuárioL != null) {
        const token = jwt.sign({
            data: usuárioL.id
          }, process.env.JWT_SECRET!, { expiresIn: 60 * 60 });

        res.status(200).json({usuário: usuárioL, token, logado: true})
    }else{
        res.json({
            "error": "Usuário ou senha inválidos",
            logado: false
        })
    }
}