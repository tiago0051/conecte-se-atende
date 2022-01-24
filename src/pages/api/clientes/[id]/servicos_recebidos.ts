import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { getUsuárioEmpresa } from "../../../../models/usuario";
import { ClienteRecebeServiço, deleteServiçoRecebido, getCliente, ServiçosRecebido } from "../../../../models/cliente";

export default async function ServicosRecebidos(req: NextApiRequest, res: NextApiResponse){
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

        getCliente(idCliente, idEmpresa).then(async cliente => {
            if(decoded.data == cliente.id_usuário){
                if(req.method == "GET"){

                }
            }else{
                getUsuárioEmpresa(decoded.data, idEmpresa).then(async (usuárioEmpresa) => {
                    if(cliente.id_empresa != idEmpresa)
                        return res.status(400).json({success: false, mensagem: "Usuário não pertence a empresa"});

                    if(usuárioEmpresa.id_permissao > 1){
                        if(req.method == "GET"){
                            ServiçosRecebido(idCliente, usuárioEmpresa.id_empresa).then(serviços => {
                                res.status(200).json({success: true, mensagem: "Serviços listado com sucesso",serviços});
                            })
                        }

                        if(req.method == "DELETE"){
                            const {id_serviço_prestado} = req.body

                            if(!id_serviço_prestado)
                                return res.status(400).json({success: false, mensagem: "ID do id_serviço_prestado não informado no corpo da requisição"});

                            deleteServiçoRecebido(id_serviço_prestado, cliente.id).then(() => {
                                return res.status(200).json({success: true, mensagem: "Serviço deletado com sucesso!"})
                            }).catch(error => {
                                return res.status(500).json({success: false, mensagem: "Erro ao buscar cliente: " + error.message, error});
                            })
                        }

                        if(req.method == "POST"){
                            const {id_serviço_recebido, valor} = req.body

                            if(!id_serviço_recebido)
                                return res.status(400).json({success: false, mensagem: "ID do id_serviço_recebido não informado no corpo da requisição"});

                            if(!valor)
                                return res.status(400).json({success: false, mensagem: "ID do valor não informado no corpo da requisição"});

                                ClienteRecebeServiço(idCliente, id_serviço_recebido, valor).then(() => {
                                    return res.status(200).json({success: true, mensagem: "Serviço recebido com sucesso!"})
                                }).catch(error => {
                                    return res.status(500).json({success: false, mensagem: "Erro ao buscar cliente: " + error.message, error});
                                })
                        }
                    }else{
                        res.status(401).json({mensagem: "O usuário logado não tem permissão para acessar essa rota"});
                    }
                }).catch(error => {
                    res.status(500).json({success: false, mensagem: "Erro ao buscar usuário"});
                })
            }
        }).catch(error => {
            return res.status(500).json({success: false, mensagem: "Erro ao buscar cliente: " + error.message, error});
        })
    }catch (error){
        return res.status(401).json({mensagem: "Token inválido", error});
    }
}