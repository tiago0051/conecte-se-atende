import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getPlanoByEmpresa } from "../../../../models/plano";
import { getUsuário, getUsuárioEmpresa } from "../../../../models/usuario";

export default function Plano(req: NextApiRequest, res: NextApiResponse)
{
    const {authorization, id_empresa} = req.headers;

    try {
        const idEmpresa = Number.parseInt(id_empresa as string);
        const token = (authorization as string).replace('Bearer ', '');

        if(!idEmpresa)
            return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!token)
            return res.status(400).json({mensagem: "Token não informado no cabeçalho"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

        if(!decoded)
            return res.status(400).json({mensagem: "Token inválido"});

        getUsuárioEmpresa(decoded.data, idEmpresa).then(async usuarioEmpresa => {
            getPlanoByEmpresa(idEmpresa).then(plano => {
                return res.json({success: true, mensagem: "Plano encontrado", plano});
            }).catch(error => {
                return res.status(500).json({success: false, mensagem: "Erro ao buscar cliente", error});
            })
        }).catch(error => {
            return res.status(500).json({success: false, mensagem: "Erro ao buscar usuário", error});
        })
    }catch (error){
        return res.status(401).json({mensagem: "Token inválido", error});
    }
}