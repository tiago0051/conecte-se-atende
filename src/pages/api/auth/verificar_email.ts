import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {EnviarEmailVerificação} from "../../../models/usuario";

export default async function VerificarEmail(req: NextApiRequest, res: NextApiResponse){
    const {email} = req.body;

    const tokenEmail = jwt.sign({
        data: email
      }, process.env.JWT_SECRET_EMAIL!, { expiresIn: 60 * 10 })

    const info = await EnviarEmailVerificação(email as string, tokenEmail);

    res.status(200).json({enviado: true, info});
}