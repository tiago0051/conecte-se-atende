import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuárioEmpresa, listarEmpresas } from "../../../../models/usuario";

export default async function ListarEmpresas(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const {authorization} = req.headers;

    const idUsuário = Number.parseInt(id as string);
    const token = (authorization as string).replace('Bearer ', '');

    try {
        if(!idUsuário)
            return res.status(400).json({mensagem: "ID do usuário não informado na query"});
        
        if(!token)
            return res.status(400).json({mensagem: "Token não informado no cabeçalho"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

        if(!decoded)
            return res.status(400).json({mensagem: "Token inválido"});
        
        if(decoded.data == idUsuário){
            if(req.method == "GET"){
                listarEmpresas(decoded.data).then(empresas => {
                    res.status(200).json({success: true, mensagem: "Empresas listadas com sucesso", empresas})
                }).catch(error => {
                    res.status(500).json({success: false, mensagem: "Erro ao listar empresas", error})
                })
            }
        }else{
            res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
        }
    }catch (error){
        res.status(401).json({mensagem: "Token inválido"});
    }
}