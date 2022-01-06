import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário } from "../../../models/usuario";
import { ClienteRecebeServiço } from "../../../models/cliente";

interface IBody {
    serviço: {
        id: number,
        nome: String,
        descrição: String,
        valor: number,
    },
    valor: number,
    token: string,
    clienteCod: number
}

export default async function ReceberServiço(req: NextApiRequest, res: NextApiResponse){
    const {serviço, valor, token, clienteCod} = req.body as IBody;

    try {
        const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

        const usuário = await getUsuário(decoded.data)

        if(usuário.id_permissao > 1){
            const cliente = await ClienteRecebeServiço(clienteCod, serviço.id, valor)
            if(cliente){
                res.status(200).json({
                    status: "success",
                    message: "Serviço recebido com sucesso!"
                })
            }else{
                res.status(500).json({
                    status: "error",
                    message: "Não foi possivel salvar o serviço!"
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
}