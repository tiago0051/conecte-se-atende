import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getEmpresa, UpdateEmpresa } from "../../../models/empresa";
import { getUsuário } from "../../../models/usuario";

export default async function getEmpresaAPI(req: NextApiRequest, res: NextApiResponse){
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
                        if(req.method == "GET"){
                            return res.status(200).json(await getEmpresa(id));
                        }

                        if(req.method == "PUT"){
                            const { nome, razao_social, cnpj, email, tel } = req.body as {
                                nome: string,
                                razao_social: string,
                                cnpj: string,
                                email: string,
                                tel: string
                            }

                            if(nome && razao_social && cnpj && email && tel){
                                const updated = await UpdateEmpresa(id, nome, razao_social, cnpj, email, tel);

                                if(updated){
                                    return res.status(200).json({sucess: true});
                                }else{
                                    return res.status(500).json({sucess: false});
                                }
                            }else{
                                return res.status(400).json({
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