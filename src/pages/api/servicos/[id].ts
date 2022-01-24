import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { getServiço, getServiços, InsertServiço, UpdateServiço } from "../../../models/serviço";
import { getUsuárioEmpresa } from "../../../models/usuario";

export default async function List(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const {authorization, id_empresa} = req.headers;

    const idServiço = Number.parseInt(id as string);
    const idEmpresa = Number.parseInt(id_empresa as string);
    const token = (authorization as string).replace('Bearer ', '');

    try {
        if(!idEmpresa)
            return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!(idServiço >= 0)){
            return res.status(400).json({mensagem: "ID do serviço não informado na query"});
        }
        
        if(!token)
            return res.status(400).json({mensagem: "Token não informado no cabeçalho"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {data: number};

        if(!decoded)
            return res.status(400).json({mensagem: "Token inválido"});

        getUsuárioEmpresa(decoded.data, idEmpresa).then(async (usuárioEmpresa) => {
            if(usuárioEmpresa.id_permissao > 1){
                if(req.method == "GET"){
                    if(idServiço == 0) {
                        getServiços(usuárioEmpresa.id_empresa).then(serviços => {
                            return res.status(200).json({success: true, mensagem: "Serviços listados com sucesso", serviços});
                        }).catch(error => {
                            return res.status(400).json({success: false, mensagem: "Erro ao listar serviços", error});
                        })
                    }else{
                        const serviço = await getServiço(idServiço, idEmpresa);

                        if(serviço){
                            res.status(200).json({success: true, mensagem: "Serviço encontrado", serviço});
                        }else{
                            res.status(404).json({success: false, mensagem: "Serviço não encontrado"});
                        }
                    }
                }

                if(req.method == "PUT"){
                    const { nome, descrição, valor } = req.body;

                    if(nome && descrição && valor){
                        if(idServiço > 0){
                            await UpdateServiço(idServiço, nome, descrição, valor, usuárioEmpresa.id_empresa)
                            return res.json({success: true, mensagem: "Serviço atualizado com sucesso"})
                        }else{
                            await InsertServiço(nome, descrição, valor, usuárioEmpresa.id_empresa)
                            return res.json({success: true, mensagem: "Serviço cadastrado com sucesso"})
                        }
                    }else{
                        return res.json({success: false, mensagem: 'Os campos obrigatórios não foram preenchidos'})
                    }
                }
            }else{
                res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
            }
        }).catch(error => {
            res.status(500).json({success: false, mensagem: "Erro ao buscar usuário"});
        })
    }catch (error){
        res.status(401).json({mensagem: "Token inválido", error});
    }
}