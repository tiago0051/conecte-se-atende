import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuário, UpdateUsuário } from "../../../models/usuario";

export default async function usuario(req: NextApiRequest, res: NextApiResponse){
    const token = req.headers.authorization;
    const number = req.query.id;

    const id = parseInt(number as string);

    try {
        if(token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

            if(decoded) {
                const usuário = await getUsuário(decoded.data)

                if(usuário.id_permissao > 1){
                    if(id){
                        if(req.method == "PUT"){
                            const { nome, email } = req.body;
    
                            if(nome && email){
                                const updated = await UpdateUsuário(id, email, req.body.nome, req.body.email);
    
                                if(updated){
                                    res.status(200).json({sucess: true})
                                }else{
                                    res.status(500).json({sucess: false})
                                }
                            }else{
                                res.status(400).json({
                                    message: "Preencha todos os campos"
                                });
                            }
                        }
                    }else{
                        res.status(400).json({
                            message: "Id não informado"
                        })
                    }
                }else{
                    res.status(401).json({msg: "Não autorizado"});
                }
            }else{
                res.status(400).json({
                    message: "Token inválido"
                })
            }
        }else{
            res.status(401).json({msg: "Não autorizado"});
        }
    }catch (error){
        res.status(401).json({msg: "Token inválido"});
    }
}