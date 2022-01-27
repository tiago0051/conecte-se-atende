import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { CadastrarSenhaUsuário, getUsuário, getUsuárioByEmail } from "../../../models/usuario";

export default async function CadastrarSenha(req: NextApiRequest, res: NextApiResponse){
    const {token, senha} = req.body;

    if(token && senha){
        try {
            const decoded = jwt.verify(token!, process.env.JWT_SECRET_EMAIL!) as {data: string};

            getUsuárioByEmail(decoded.data).then(async (usuário) => {
                CadastrarSenhaUsuário(usuário.email, senha).then(verify => {
                    if(verify){
                        return res.status(200).json({
                            status: "success",
                            message: "Usuário cadastrado com sucesso, você ira receber um e-mail para finalizar o cadastro!"
                        })
                    }else{
                        return res.status(500).json({
                            status: "error",
                            message: "Erro ao cadastrar usuário"
                        })
                    }
                }).catch(error => {
                    return res.status(500).json({
                        status: "error",
                        message: "Erro ao cadastrar usuário: " + error.message,
                        error
                    })
                })
            }).catch(error => {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar usuário: " + error.message,
                    error
                })
            })
        }catch (error){
            return res.status(401).json({
                status: 'error',
                message: 'Usuário não autorizado'
            })
        }
    }else{
        res.status(500).json({message: "Informações incorretas"})
    }
}