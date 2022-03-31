import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {EnviarEmailVerificação, getUsuárioByEmail} from "../../../models/usuario";

export default async function VerificarEmail(req: NextApiRequest, res: NextApiResponse){
    const {email} = req.body;

    getUsuárioByEmail(email).then(async usuário => {

      console.log(usuário)
      const tokenEmail = jwt.sign({
          data: email
        }, process.env.JWT_SECRET_EMAIL!, { expiresIn: 60 * 15 })

      const info = await EnviarEmailVerificação(email as string, tokenEmail);

      res.status(200).json({enviado: true, info});
    }).catch(err => {
      res.status(200).json({enviado: false, info: err.message});
    })

}