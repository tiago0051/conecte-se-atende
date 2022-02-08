import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuárioEmpresa, getUsuáriosEmpresaFromPermission, UpdateUsuário } from "../../../../models/usuario";

export default async function usuario(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const {authorization, id_empresa} = req.headers;

    const idUsuário = Number.parseInt(id as string);
    const idEmpresa = Number.parseInt(id_empresa as string);
    const token = (authorization as string).replace('Bearer ', '');

    try {
        if(!idEmpresa)
            return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!idUsuário && idUsuário !== 0)
            return res.status(400).json({mensagem: "ID do usuário não informado na query"});
        
        if(!token)
            return res.status(400).json({mensagem: "Token não informado no cabeçalho"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

        if(!decoded)
            return res.status(400).json({mensagem: "Token inválido"});
        
        
        getUsuárioEmpresa(decoded.data, idEmpresa).then(async usuárioEmpresa => {
            if(usuárioEmpresa.id == idUsuário){
                if(req.method == "PUT"){
                    const { nome, email } = req.body;
    
                    if(nome && email){
                        const updated = await UpdateUsuário(idUsuário, email, nome, email);
    
                        if(updated){
                            res.status(200).json({success: true, mensagem: "Usuário atualizado com sucesso"});
                        }else{
                            res.status(500).json({success: false, mensagem: "Erro ao atualizar usuário"});
                        }
                    }else{
                        res.status(400).json({
                            mensagem: "Informe o nome e o email"
                        });
                    }
                }
            }else{
                if(usuárioEmpresa.id_permissao > 2){
                    if(req.method == "PUT"){
                        const { nome, email } = req.body;
        
                        if(nome && email){
                            const updated = await UpdateUsuário(idUsuário, email, nome, email);
        
                            if(updated){
                                res.status(200).json({success: true, mensagem: "Usuário atualizado com sucesso"});
                            }else{
                                res.status(500).json({success: false, mensagem: "Erro ao atualizar usuário"});
                            }
                        }else{
                            res.status(400).json({
                                mensagem: "Informe o nome e o email"
                            });
                        }
                    }

                    if(req.method == "GET"){
                        if(idUsuário === 0){
                            getUsuáriosEmpresaFromPermission(idEmpresa, 2).then(usuarios => {
                                res.status(200).json({success: true, mensagem: "Funcionários listados com sucesso", usuarios});
                            }).catch(error => {
                                res.status(500).json({success: false, mensagem: "Erro ao listar funcionários", error});
                            })
                        }
                    }
                }else{
                    res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
                }
            }
        }).catch(error => {
            res.status(500).json({success: false, mensagem: "Erro ao buscar usuário"});
        })
    }catch (error){
        res.status(401).json({mensagem: "Token inválido"});
    }
}