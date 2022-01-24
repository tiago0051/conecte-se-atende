import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getEmpresa, UpdateEmpresa } from "../../../models/empresa";
import { getUsuárioEmpresa } from "../../../models/usuario";

export default async function getEmpresaAPI(req: NextApiRequest, res: NextApiResponse){
    const {authorization, id_empresa} = req.headers;

    const idEmpresa = Number.parseInt(id_empresa as string);
    const token = (authorization as string).replace('Bearer ', '');

    try {
        if(!idEmpresa)
        return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!token)
            return res.status(400).json({mensagem: "Token não informado no cabeçalho"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

        if(!decoded)
            return res.status(400).json({mensagem: "Token inválido"});

        getUsuárioEmpresa(decoded.data, idEmpresa).then(async usuarioEmpresa => {
            if(usuarioEmpresa.id_permissao > 1){
                if(idEmpresa){
                    if(req.method == "GET"){
                        return res.status(200).json(await getEmpresa(idEmpresa));
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
                            const updated = await UpdateEmpresa(idEmpresa, nome, razao_social, cnpj, email, tel);
    
                            if(updated){
                                return res.status(200).json({success: true});
                            }else{
                                return res.status(500).json({success: false});
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
        }).catch(error => {
            res.status(500).json({success: false, mensagem: "Erro ao listar empresas", error})
        })
    }catch (error){
        res.status(401).json({msg: "Token inválido"});
    }
}