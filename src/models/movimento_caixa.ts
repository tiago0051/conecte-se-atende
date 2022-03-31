import db from "../services/db";

interface IMovimento_Caixa {
    id: number,
    valor: number,
    id_cliente: number,
    id_produto: number,
    id_usuário_funcionário: number,
}

interface IProduto {
    id: number
}

const movimento_caixa = (id: number, valor: number, id_cliente: number, id_produto: number, id_usuário_funcionário: number) => {
    return <IMovimento_Caixa>{
        id,
        valor,
        id_cliente,
        id_produto,
        id_usuário_funcionário,
    }
}

export async function getMovimento_Caixa(id: number){
    const DB = await db();

    return new Promise<IMovimento_Caixa>((resolve, reject) => {
        DB.query(`SELECT * FROM movimento_caixa WHERE id_fluxo_caixa = ${id};`, (err, result) => {
            if(err) reject(err)

            resolve(movimento_caixa(result[0].id_fluxo_caixa, result[0].valor, result[0].id_cliente, result[0].id_produto, result[0].id_usuário_funcionario))
        })
    })
}

export async function Get_Movimento_Caixa_ByIntervalDate(data_inicio: Date, data_fim: Date){
    const DB = await db();

    return new Promise<IMovimento_Caixa[]>((resolve, reject) => {
        DB.query(`SELECT * FROM movimento_caixa WHERE data_hora BETWEEN '${data_inicio}' AND '${data_fim}';`, (err, result) => {
            if(err) reject(err)

            resolve(result.map((movimento_caixaL: { id_fluxo_caixa: number; valor: number; id_cliente: number; id_produto: number; id_usuário_funcionário: number; }) => {
                return movimento_caixa(movimento_caixaL.id_fluxo_caixa, movimento_caixaL.valor, movimento_caixaL.id_cliente, movimento_caixaL.id_produto, movimento_caixaL.id_usuário_funcionário)
            }))
        })
    })
}

export async function Insert_Movimento_Caixa(valor_pago: number, valor_total: number, id_cliente: number, produtos: IProduto[], id_usuário_funcionário: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`INSERT INTO fluxo_caixa (valor_pago, valor_total, id_cliente, id_usuario_funcionario) VALUES (${valor_pago}, ${valor_total}, ${id_cliente}, ${id_usuário_funcionário})`, (err, result) => {
            if(err) reject(err)
            
            if(result.affectedRows > 0){
                produtos.forEach(produto => {
                    DB.query(`INSERT INTO fluxo_caixa_produtos (id_fluxo_caixa, id_produto) VALUES (${result.insertId}, ${produto})`, (err, result) => {
                        if(err) reject(err)

                        if(result.affectedRows > 0)
                            resolve(true)
                        else reject(new Error("Não foi possível inserir o produto na venda"))
                    })
                });
            }
            else reject(new Error("Problema ao inserir movimento_caixa"))
        })
    })
}

export default movimento_caixa;