import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { getCliente, getClienteUsuários, InsertCliente, UpdateCliente } from "../../../../models/cliente";
import { getUsuário, getUsuárioEmpresa } from "../../../../models/usuario";

interface IBodyPuty {
    nome: string,
    cpf: string,
    email: string,
    whatsapp: string,
    telefone: string,
    endereço: string,
    aniversario: string,
    obs: string
}

export default async function List(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    const {authorization, id_empresa} = req.headers;

    try {
        const idCliente = Number.parseInt(id as string);
        const idEmpresa = Number.parseInt(id_empresa as string);
        const token = (authorization as string).replace('Bearer ', '');
        
        if(!idEmpresa)
            return res.status(400).json({mensagem: "ID da empresa não informado no cabeçalho"});
        
        if(!(idCliente >= 0)){
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
                    if(idCliente > 0) {
                        getCliente(idCliente, idEmpresa).then(async (cliente) => {
                            getUsuário(cliente.id_usuário).then(async usuário => {
                                return res.status(200).json({nome: usuário.nome, cpf: cliente.cpf, email: usuário.email, whatsapp: cliente.whatsapp, telefone: cliente.telefone, endereço: cliente.endereço, aniversario: cliente.aniversario, obs: cliente.obs})
                            }).catch(error => {
                                return res.status(500).json({success: false, mensagem: "Erro ao buscar usuário: " + error.message, error});
                            })
                        }).catch(error => {
                            return res.status(500).json({success: false, mensagem: "Erro ao buscar cliente: " + error.message, error});
                        })
                    }else{
                        getClienteUsuários(usuárioEmpresa.id_empresa).then(clientes => {
                            return res.status(200).json({success: true, mensagem: "Clientes listados com sucesso", clientes})
                        }).catch(err => {
                            return res.status(500).json({success: false, mensagem: "Erro ao buscar clientes: " + err.message, error: err});
                        })
                    }
                }

                if(req.method == "PUT"){
                    const {nome, cpf, email, whatsapp, telefone, endereço, aniversario, obs} : IBodyPuty = req.body

                    if(nome && email && whatsapp){
    
                        if(idCliente > 0){
                            UpdateCliente(idCliente, nome, cpf, email, whatsapp, telefone, endereço, aniversario, obs, usuárioEmpresa.id_empresa).then(() => {
                                return res.status(200).json({success: true, mensagem: "Cliente atualizado com sucesso"});
                            }).catch(error => {
                                console.log(error)
                                return res.status(500).json({success: false, mensagem: "Erro ao atualizar cliente: " + error.message, error});
                            })
                        }else{
                            InsertCliente(nome, email, cpf ? cpf : " ", whatsapp, telefone ? whatsapp : " ", usuárioEmpresa.id_empresa, endereço ? endereço : " ", aniversario ? aniversario : "", obs ? obs : " ").then(() => {
                                return res.status(200).json({success: true, mensagem: "Cliente cadastrado com sucesso"});
                            }).catch(error => {
                                return res.status(500).json({success: false, mensagem: "Erro ao cadastrar cliente: " + error.message, error});
                            })
                        }
                    }else{
                        return res.json({success: false, mensagem: 'Os campos obrigatórios não foram preenchidos', campos: ['nome', 'email', 'whatsapp']})
                    }
                }
            }else{
                res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
            }
        }).catch(error => {
            res.status(500).json({success: false, mensagem: "Erro ao buscar usuário: " + error.message, error});
        })
    }catch (error){
        return res.status(401).json({mensagem: "Token inválido", error});
    }
}