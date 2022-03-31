import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Insert_Movimento_Caixa } from "../../../models/movimento_caixa";

interface IProduto {
    id: number
}

export default function CadastrarVenda(req: NextApiRequest, res: NextApiResponse){
    const bearer_token = req.headers.authorization;

    if(!bearer_token) res.status(401).json({message: "Não autorizado"});

    const token = bearer_token!.split(" ")[1];

    var id_usuário_logado = 0;
    jwt.verify(token, process.env.JWT_SECRET!, (error, decoded) => {
        if(error)
            return res.status(401).json({message: "Não autorizado", error});
        
        id_usuário_logado = decoded!.data
    })

    if(req.method == "POST"){
        const {valor_pago, valor_total, id_cliente, produtos, id_usuário_vendedor} = req.body as {valor_pago: number, valor_total: number, id_cliente: number, produtos: IProduto[], id_usuário_vendedor: number};

        if(valor_pago && valor_total && id_cliente && produtos && id_usuário_vendedor){

            Insert_Movimento_Caixa(valor_pago, valor_total, id_cliente, produtos, id_usuário_vendedor).then(() => {
                res.status(200).json({success: true,  mensagem: "Venda cadastrada com sucesso"});
            }).catch((error) => {
                res.status(500).json({success: false, mensagem: "Erro ao cadastrar venda", error});
            })
        }else{
            return res.status(400).json({mensagem: "Dados insuficientes, para cadastrar uma venda é necessário os seguintes dados {valor_pago: '0.00', valor_total: '0.00', id_cliente: '0', produtos: [2, 2, 2], id_usuário_vendedor: '1'}" });
        }
    }
}