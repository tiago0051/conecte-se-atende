import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { getProduto, getProdutos, InsertProduto, UpdateProduto } from "../../../models/produto";
import { getUsuárioEmpresa } from "../../../models/usuario";

export default async function List(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const {authorization, id_empresa} = req.headers;

    const idProduto = Number.parseInt(id as string);
    const idEmpresa = Number.parseInt(id_empresa as string);
    const token = (authorization as string).replace('Bearer ', '');

    try {
        if(!idEmpresa)
            return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!(idProduto >= 0)){
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
                    if(idProduto == 0) {
                        getProdutos(usuárioEmpresa.id_empresa).then(produtos => {
                            return res.status(200).json({success: true, mensagem: "Serviços listados com sucesso", produtos});
                        }).catch(error => {
                            return res.status(400).json({success: false, mensagem: "Erro ao listar serviços", error});
                        })
                    }else{
                        const produto = await getProduto(idProduto, idEmpresa);

                        if(produto){
                            res.status(200).json({success: true, mensagem: "Serviço encontrado", produto});
                        }else{
                            res.status(404).json({success: false, mensagem: "Serviço não encontrado"});
                        }
                    }
                }

                if(req.method == "PUT"){
                    const { tipo_produto, nome, descricao, valor_custo, valor_venda_varejo, valor_venda_atacado, quantidade } = req.body;

                    if(nome && descricao && valor_venda_varejo){
                        if(idProduto > 0){
                            UpdateProduto(idProduto, tipo_produto, nome, descricao, valor_custo, valor_venda_varejo, valor_venda_atacado, quantidade, idEmpresa).then(() => {
                                return res.json({success: true, mensagem: "Serviço atualizado com sucesso"})
                            }).catch(error => {
                                return res.status(500).json({success: false, mensagem: "Erro ao atualizar serviço", error});
                            })
                        }else{
                            InsertProduto(tipo_produto, nome, descricao, valor_custo, valor_venda_varejo, valor_venda_atacado, usuárioEmpresa.id_empresa, quantidade).then(() => {
                                return res.json({success: true, mensagem: "Produto cadastrado com sucesso"})
                            }).catch(error => {
                                return res.status(500).json({success: false, mensagem: "Erro ao cadastrar produto", error});
                            })
                        }
                    }else{
                        return res.json({success: false, mensagem: 'Os campos obrigatórios não foram preenchidos'})
                    }
                }
            }else{
                res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
            }
        }).catch(error => {
            res.status(500).json({success: false, mensagem: "Erro ao buscar usuário", error});
        })
    }catch (error){
        res.status(401).json({mensagem: "Token inválido", error});
    }
}