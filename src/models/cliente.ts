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
}

const cliente = (id: number, id_usuário: number, cpf: String, whatsapp: String, telefone: String, id_empresa: number, endereço: String, aniversario: String) =>{
    return <ICliente>{id, id_usuário, cpf, whatsapp, telefone, id_empresa, endereço, aniversario}
}

export default cliente

export async function getCliente(id: number){
    const DB = await db();

    return new Promise<ICliente>((resolve, reject) => {
        DB.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, result) => {
            if(err) reject(err)
           resolve(cliente(result[0].id, result[0].id_usuario, result[0].cpf, result[0].whatsapp, result[0].tel, result[0].id_empresa, result[0].endereco, result[0].aniversario))
        })
    })
}

export async function InsertCliente(nome: String, email: String, cpf: string, whatsapp: string, telefone: string, id_empresa: number, endereço: string, aniversario: string){
    const DB = await db();

    var usuário = await InsertUsuário(email, nome, email, id_empresa, 1)

    return new Promise<Boolean>((resolve, reject) => {
        if(usuário){
            const sqlQuery = `INSERT INTO clientes (id_usuario, cpf, whatsapp, tel, id_empresa, endereco${aniversario != "" ? ", aniversario" : ""}) VALUES (${usuário.id}, '${cpf}', '${whatsapp}', '${telefone}', ${id_empresa}, '${endereço}'${aniversario != "" ? ", '" + aniversario + "'" : ""})`;
            DB.query(sqlQuery, (err, result) => {
                if(err) resolve(false)
               resolve(true)
            })
        }else{
            resolve(false)
        }
    })
}

export async function UpdateCliente(id: number, nome: string, cpf: string, email: string, whatsapp: string, telefone: string, endereço: string, aniversario: string){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`UPDATE clientes SET cpf = '${cpf}', whatsapp = '${whatsapp}', tel = '${telefone}', endereco = '${endereço}', aniversario = '${aniversario}' WHERE id = ${id};`, (err, result) => {
            if(err) reject(false)

            DB.query(`SELECT * FROM clientes WHERE id = ${id};`, async (err, result) => {
                if(err) reject(false)

                const usuário = await UpdateUsuário(result[0].id_usuario, email, nome, email)

                if(usuário){
                    resolve(true)
                }else{
                    reject(false)
                }
            })
            
        })
    })
}

export async function getClienteUsuário(cliente: ICliente){
    return {cliente, usuário: await getUsuário(cliente.id_usuário)}
}

export async function getClientes(id_empresa: number){
    const DB = await db();

    return new Promise<ICliente[]>((resolve, reject) => {
        DB.query(`SELECT * FROM clientes WHERE id_empresa = ${id_empresa}`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { id: number; id_usuario: number; cpf: String; whatsapp: String; tel: String; id_empresa: number; endereço: String; aniversario: String; }) => {
               return cliente(clienteL.id, clienteL.id_usuario, clienteL.cpf, clienteL.whatsapp, clienteL.tel, clienteL.id_empresa, clienteL.endereço, clienteL.aniversario)
           }))
        })
    })
}

export async function getClienteUsuários(id_empresa: number){
    const DB = await db();

    return new Promise<{nome: String, email: String, cpf: String}[]>((resolve, reject) => {
        DB.query(`SELECT usuarios.nome, usuarios.email, clientes.cpf, clientes.id FROM clientes INNER JOIN usuarios ON id_usuario = usuarios.id WHERE usuarios.id_empresa = ${id_empresa};`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { nome: String; email: String; cpf: String, id: number}) => {
               return {id: clienteL.id, nome: clienteL.nome, email: clienteL.email, cpf: clienteL.cpf}
           }))
        })
    })
}