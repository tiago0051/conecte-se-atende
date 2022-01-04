import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário } from "../../../models/usuario";
import { getClienteUsuários } from "../../../models/cliente";

export default async function Listar(req: NextApiRequest, res: NextApiResponse){
    const token = req.headers.authorization;

    const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {data: number};

    const usuário = await getUsuário(decoded.data)

    res.status(200).json(await getClienteUsuários(usuário.id_empresa))
}