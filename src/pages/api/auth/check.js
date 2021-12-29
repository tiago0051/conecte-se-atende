import jwt from 'jsonwebtoken';

import { getEmpresa } from '../../../models/empresa';

export default function Check(req, res){
    const {token} = req.body;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
            if(err){
                return res.json({error: 'Token inválido', logado: false});
            }

            var empresa = await getEmpresa(decoded.data)

            return res.json({empresa, logado: true});
        })
    }else{
        return res.json({error: 'Token não informado', logado: false})
    }
}