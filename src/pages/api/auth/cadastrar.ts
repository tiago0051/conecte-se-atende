import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { CadastrarSenhaUsuário, getUsuário, getUsuárioByEmail } from "../../../models/usuario";

export default async function CadastrarSenha(req: NextApiRequest, res: NextApiResponse){
    const {token, senha} = req.body;

    if(token && senha){
        try {
            const decoded = jwt.verify(token!, process.env.JWT_SECRET_EMAIL!) as {data: string};
    
            const usuário = await getUsuárioByEmail(decoded.data, )
    
            const verify = await CadastrarSenhaUsuário(usuário.email, senha)

            if(verify){
                res.status(200).json({
                    status: "success",
                    message: "Usuário cadastrado com sucesso"
                })
            }else{
                res.status(500).json({
                    status: "error",
                    message: "Erro ao cadastrar usuário"
                })
            }
        }catch{
            res.status(401).json({
                status: 'error',
                message: 'Usuário não autorizado'
            })
        }
    }else{
        res.status(500).json({message: "Informações incorretas"})
    }
}