import db from '../services/db'

interface IProduto {
    id_produto: number,
    tipo_produto: number,
    nome: string,
    descricao?: string,
    valor_custo?: number,
    valor_venda_varejo: number,
    valor_venda_atacado?: number
}

export async function getProduto(id: number, id_empresa: number){
    const DB = await db();

    return new Promise<IProduto>((resolve, reject) => {
        DB.query(`SELECT * FROM produtos WHERE id_produto = '${id}' AND id_empresa = '${id_empresa}'`, (err, result: IProduto[]) => {
            if(err) reject(err)

            if(result.length > 0){
                resolve({
                    id_produto: result[0].id_produto, 
                    tipo_produto: result[0].tipo_produto, 
                    nome: result[0].nome, 
                    descricao: result[0].descricao, 
                    valor_custo: result[0].valor_custo,
                    valor_venda_varejo: result[0].valor_venda_varejo,
                    valor_venda_atacado: result[0].valor_venda_atacado
                } as IProduto)
            }else{
                reject(new Error('Produto não encontrado'))
            }
        })
    })
}

export async function InsertProduto(tipo_produto: number, nome: string, descrição: string, valor_custo: number, valor_venda_varejo: number, valor_venda_atacado: number, id_empresa: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        const sqlQuery = `INSERT INTO produtos (` +
            `tipo_produto, ` +
            `nome, `+
            `${descrição ? 'descricao, ' : ''}` +
            `${valor_custo ? 'valor_custo, ' : ''}` +
            `valor_venda_varejo, ` +
            `${valor_venda_atacado ? 'valor_venda_atacado, ' : ''}` +
            `id_empresa` +
            `) VALUES (` +
                `'${tipo_produto}', ` +
                `'${nome}', ` +
                `${descrição ? `'${descrição}', ` : ''}` +
                `${valor_custo ? `'${valor_custo}', ` : ''}` +
                `'${valor_venda_varejo}', ` +
                `${valor_venda_atacado ? `'${valor_venda_atacado}', ` : ''}` +
                `'${id_empresa}')`;

        DB.query(sqlQuery, (err, result) => {
            if(err)reject(err)

            if(result.affectedRows > 0){
                resolve(true)
            }else{
                reject(new Error('Erro ao inserir produto'))
            }
        })
    })
}

export async function UpdateServiço(id: number, tipo_produto: number, nome: string, descricao: string, valor_custo: number, valor_venda_varejo: number, valor_venda_atacado: number, id_empresa: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        const sqlQuery = 
            `UPDATE produtos SET ` +
            `tipo_produto = '${tipo_produto}'` +
            `, nome = '${nome}'` +
            `${descricao ? `, descricao = '${descricao}'` : ``}` +
            `${valor_custo ? `, valor_custo = '${valor_custo}'` : ``}` +
            `, valor_venda_varejo = '${valor_venda_varejo}'` +
            `${valor_venda_atacado ? `, valor_venda_atacado = '${valor_venda_atacado}'` : ``}` +
            ` WHERE id_produto = ${id} AND id_empresa = ${id_empresa};`

        DB.query(sqlQuery, (err, result) => {
            if(err) reject(err)
            
            if(result.affectedRows > 0){
                resolve(true)
            }else{
                reject(new Error('Erro ao atualizar produto'))
            }
        })
    })
}

export async function getProdutos(id_empresa: number) : Promise<IProduto[]>{
    const DB = await db();

    return new Promise<IProduto[]>((resolve, reject) => {
        DB.query(`SELECT * FROM produtos WHERE id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((produto: IProduto) => {
               return {id_produto: produto.id_produto, tipo_produto: produto.tipo_produto, nome: produto.nome, descricao: produto.descricao, valor_venda_varejo: produto.valor_venda_varejo, valor_venda_atacado: produto.valor_venda_atacado}
           }))
        })
    })
}