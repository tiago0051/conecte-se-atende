import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { getUsuário } from '../../../models/usuario';

export default async function Check(req: NextApiRequest, res: NextApiResponse){
    const {token} = req.body;

    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if(decoded){
            var usuário = await getUsuário((decoded as any).data);

            return res.json({usuário, logado: true});
        }
    }else{
        return res.json({error: 'Token não informado', logado: false})
    }
}