import db from '../services/db'
import { getUsuário, InsertUsuário, UpdateUsuário } from './usuario';

interface ICliente {
    id: number,
    id_usuário: number,
    cpf: string,
    whatsapp: string,
    telefone: string,
    id_empresa: number,
    endereço: string,
    aniversario: string,
    obs: String
}

const cliente = (id: number, id_usuário: number, cpf: String, whatsapp: String, telefone: String, id_empresa: number, endereço: String, aniversario: String, obs: String) =>{
    return <ICliente>{id, id_usuário, cpf, whatsapp, telefone, id_empresa, endereço, aniversario, obs}
}

export default cliente

export async function getCliente(id: number, id_empresa: number){
    const DB = await db();

    return new Promise<ICliente>((resolve, reject) => {
        DB.query(`SELECT * FROM clientes WHERE id = ${id} AND id_empresa = ${id_empresa}`, (err, result) => {
            if(err) return reject(err)

            if(result.length == 0) return reject(new Error("Cliente não encontrado"))

            resolve(cliente(result[0].id, result[0].id_usuario, result[0].cpf, result[0].whatsapp, result[0].tel, result[0].id_empresa, result[0].endereco, result[0].aniversario, result[0].obs))
        })
    })
}

export async function InsertCliente(nome: String, email: String, cpf: string, whatsapp: string, telefone: string, id_empresa: number, endereço: string, aniversario: string, obs: String){
    const DB = await db();

    var usuário = await InsertUsuário(email, nome, email, id_empresa, 1)

    return new Promise<Boolean>((resolve, reject) => {
        if(usuário){
            const sqlQuery = `INSERT INTO clientes (id_usuario, cpf, whatsapp, tel, id_empresa, endereco${aniversario != "" ? ", aniversario" : ""}, obs) VALUES (${usuário.id}, '${cpf}', '${whatsapp}', '${telefone}', ${id_empresa}, '${endereço}'${aniversario != "" ? ", '" + aniversario + "'" : ""}, '${obs}')`;
            DB.query(sqlQuery, (err, result) => {
                if(err) resolve(false)
               resolve(true)
            })
        }else{
            resolve(false)
        }
    })
}

export async function UpdateCliente(id: number, nome: string, cpf: string, email: string, whatsapp: string, telefone: string, endereço: string, aniversario: string, obs: string, id_empresa: number){
    const DB = await db();

    return new Promise((resolve, reject) => {
        DB.query(`UPDATE clientes SET cpf = '${cpf}', whatsapp = '${whatsapp}', tel = '${telefone}', endereco = '${endereço}', aniversario = '${aniversario}', obs = '${obs}' WHERE id = '${id}' AND id_empresa = '${id_empresa}';`, (err, result) => {
            if(err) return reject(err)

            if(result.affectedRows == 0)
                reject(new Error("Cliente não encontrado"))

            DB.query(`SELECT * FROM clientes WHERE id = ${id};`, async (err, result) => {
                if(err) return reject(err)

                UpdateUsuário(result[0].id_usuario, email, nome, email).then(() => {
                    resolve(true)
                }).catch((error => {
                    reject(error)
                }))
            })
            
        })
    })
}

export async function getClienteUsuário(cliente: ICliente, id_empresa: number){
    return {cliente, usuário: await getUsuário(cliente.id_usuário)}
}

export async function getClientes(id_empresa: number){
    const DB = await db();

    return new Promise<ICliente[]>((resolve, reject) => {
        DB.query(`SELECT * FROM clientes WHERE id_empresa = ${id_empresa}`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { id: number; id_usuario: number; cpf: String; whatsapp: String; tel: String; id_empresa: number; endereço: String; aniversario: String; obs: String }) => {
               return cliente(clienteL.id, clienteL.id_usuario, clienteL.cpf, clienteL.whatsapp, clienteL.tel, clienteL.id_empresa, clienteL.endereço, clienteL.aniversario, clienteL.obs)
           }))
        })
    })
}

export async function getClienteUsuários(id_empresa: number){
    const DB = await db();

    return new Promise<{nome: String, email: String, cpf: String}[]>((resolve, reject) => {
        DB.query(`SELECT usuarios.nome, usuarios.email, clientes.cpf, clientes.id FROM clientes INNER JOIN usuarios ON id_usuario = usuarios.id WHERE clientes.id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { nome: String; email: String; cpf: String, id: number}) => {
               return {id: clienteL.id, nome: clienteL.nome, email: clienteL.email, cpf: clienteL.cpf}
           }))
        })
    })
}

export async function ClienteRecebeServiço(id_cliente: number, id_serviço: number, valor: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`INSERT INTO cliente_recebe_servico (id_servico, id_cliente, valor) VALUES (${id_serviço}, ${id_cliente}, '${valor}')`, (err, result) => {
            if(err) reject(false)
           resolve(true)
        })
    })
}

interface IServiço {
    id: number,
    nome: String,
    descrição: String,
    valor: number,
}

export async function ServiçosRecebido(id_cliente: number, id_empresa: number){
    const DB = await db();

    return new Promise<IServiço[]>((resolve, reject) => {
        DB.query(`SELECT cliente_recebe_servico.id, cliente_recebe_servico.valor, servicos.nome, servicos.descricao FROM cliente_recebe_servico INNER JOIN servicos ON id_servico = servicos.id WHERE id_cliente = ${id_cliente} AND id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((serviçoL: { id: number; nome: String; descricao: String; valor: number; }) => {
               return {id: serviçoL.id, nome: serviçoL.nome, descrição: serviçoL.descricao, valor: serviçoL.valor}
           }))
        })
    })
}

export async function deleteServiçoRecebido(id_servico_recebido: number, id_cliente: number){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`DELETE FROM cliente_recebe_servico WHERE id = '${id_servico_recebido}' AND id_cliente = '${id_cliente}'`, (err, result) => {
            if(err) return reject(err)

            if(result.affectedRows == 0)
                return reject(new Error("Não foi possível deletar o serviço"))

            return resolve(true)
        })
    })
}