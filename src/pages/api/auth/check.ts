import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { getUsuário, getUsuárioEmpresa } from '../../../models/usuario';

export default async function Check(req: NextApiRequest, res: NextApiResponse){
    const {token, id_empresa} = req.body;

    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if(decoded){
            if(id_empresa && id_empresa > 0){
                getUsuárioEmpresa((decoded as any).data, id_empresa as number).then(result => {
                    return res.json({usuário: result, logado: true});
                }).catch(err => {
                    return res.json({logado: false, error: err.message});
                })
            }else{
                getUsuário((decoded as any).data).then(result => {
                    return res.json({usuário: result, logado: true});
                }).catch(err => {
                    return res.json({logado: false, error: err.message});
                })
            }
        }
    }else{
        return res.json({error: 'Token não informado', logado: false})
    }
}