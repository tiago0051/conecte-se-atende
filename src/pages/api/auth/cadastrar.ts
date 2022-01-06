import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { CadastrarSenhaUsuário, getUsuário } from "../../../models/usuario";

export default async function CadastrarSenha(req: NextApiRequest, res: NextApiResponse){
    const {token, senha, id} = req.body;

    if(token && senha){
        try {
            const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};
    
            const usuário = await getUsuário(decoded.data)
    
            if(usuário.id == 1){
                const usuário = await CadastrarSenhaUsuário(id, senha)
                if(usuário){
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
            }else{
                return res.status(401).json({message: "Usuário não autorizado"})
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