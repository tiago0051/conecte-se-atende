import db from '../services/db'

interface IServiço {
    id: number,
    nome: string,
    descrição: string,
    valor: number
}

const serviço = (id: number, nome: string, descrição: string, valor: number) =>{
    return <IServiço>{id, nome, descrição, valor}
}

export default serviço

export async function getServiço(id: number, id_empresa: number){
    const DB = await db();

    return new Promise<IServiço>((resolve, reject) => {
        DB.query(`SELECT * FROM servicos WHERE id = ${id} AND id_empresa = ${id_empresa}`, (err, result) => {
            if(err) reject(err)
           resolve(serviço(result[0].id, result[0].nome, result[0].descricao, result[0].valor))
        })
    })
}

export async function InsertServiço(nome: string, descrição: string, valor: number, id_empresa: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        const sqlQuery = `INSERT INTO servicos (nome, descricao, valor, id_empresa) VALUES ('${nome}', '${descrição}', '${valor}', '${id_empresa}')`;
        DB.query(sqlQuery, (err, result) => {
            if(err){
                resolve(false)
                throw err
            }
           resolve(true)
        })
    })
}

export async function UpdateServiço(id: number, nome: string, descrição: string, valor: number, id_empresa: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`UPDATE servicos SET nome = '${nome}', descricao = '${descrição}', valor = '${valor}' WHERE id = ${id} AND id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(false)
            
            resolve(true)
        })
    })
}

export async function getServiços(id_empresa: number){
    const DB = await db();

    return new Promise<{nome: String, email: String, cpf: String}[]>((resolve, reject) => {
        DB.query(`SELECT * FROM servicos WHERE id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { id: number, nome: string, descricao: string, valor: number}) => {
               return {id: clienteL.id, nome: clienteL.nome, descrição: clienteL.descricao, valor: clienteL.valor}
           }))
        })
    })
}