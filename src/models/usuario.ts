import bcrypt from 'bcrypt'

import db from '../services/db'

interface IUsuário {
    id: number,
    user: String,
    nome: String,
    email: String,
    id_empresa: number,
    id_permissao: number
}

const usuário = (id: number, user: String, nome: String, email: String, id_empresa: number, id_permissao: number) =>{
    return <IUsuário>{id : id, user, nome, email, id_empresa, id_permissao}
}

export default usuário

export async function getUsuário(id: number){
    const DB = await db();

    return new Promise<IUsuário>((resolve, reject) => {
        DB.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, result) => {
            if(err) reject(err)
           resolve(usuário(result[0].id, result[0].user, result[0].nome, result[0].email, result[0].id_empresa, result[0].id_permissao))
        })
    })
}

export async function loginUsuário(usuárioL: String, senha: string){
    const DB = await db();
    
    var sql = `SELECT * FROM usuarios WHERE email = '${usuárioL}'`;

    return new Promise<IUsuário | null>((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err) throw err;
    
            if(result.length > 0){
                if(compareHash(senha, result[0].senha)){
                      resolve(usuário(result[0].id, result[0].user, result[0].nome, result[0].email, result[0].id_empresa, result[0].id_permissao))
                }else{
                    resolve(null)
                }
            }else{
                resolve(null)
            }
        })
    })
}

export async function InsertUsuário(user: String, nome: String, email: String, id_empresa: number, id_permissao: number){
    const DB = await db();

    var sql = `INSERT INTO usuarios (user, nome, email, id_empresa, id_permissao, id_tipo_acesso) VALUES ('${user}', '${nome}', '${email}', ${id_empresa}, ${id_permissao}, 1)`;

    return new Promise<IUsuário | null>((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err)resolve(null)

            if(result.insertId){
                resolve(usuário(result.insertId, result.user, result.nome, result.email, result.id_empresa, result.id_permissao))
            }else{
                resolve(null)
            }
        })
    })
}

export async function UpdateUsuário(id: number, user: String, nome: String, email: String){
    const DB = await db();

    var sql = `UPDATE usuarios SET user = '${user}', nome = '${nome}', email = '${email}' WHERE id = ${id}`;

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err)resolve(false)

            if(result.affectedRows){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}

export function encrypt(senha: string){
    var hash = bcrypt.hashSync(senha, 10)

    return hash
}

function compareHash(senha: string, hash: string){
    var result = bcrypt.compareSync(senha, hash)

    return result
}