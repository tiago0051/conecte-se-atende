import bcrypt from 'bcrypt'

import db from '../services/db'

function empresa(id, nome, razao_social, cnpj, email, tel){
    return {id : id, nome, razao_social, cnpj, email, tel}
}

export default empresa

export async function getEmpresa(id){
    const DB = await db();

    return new Promise((resolve, reject) => {
        DB.query(`SELECT * FROM empresas WHERE id = ${id}`, (err, result) => {
            if(err) reject(err)
           resolve(empresa(result[0].id, result[0].nome, result[0].razao_social, result[0].cnpj, result[0].email, result[0].tel))
        })
    })
}

export async function loginEmpresa(usuário, senha){
    const DB = await db();
    
    var sql = `SELECT * FROM empresas WHERE email = '${usuário}'`;

    return new Promise((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err) throw err;
    
            if(result.length > 0){
                if(compareHash(senha, result[0].senha)){
                      resolve(empresa(result[0].id, result[0].nome, result[0].razao_social, result[0].cnpj, result[0].email, result[0].tel))
                }else{
                    resolve(null)
                }
            }else{
                resolve(null)
            }
        })
    })
}

function encrypt(senha){
    var hash = bcrypt.hashSync(senha, 10)

    return hash
}

function compareHash(senha, hash){
    var result = bcrypt.compareSync(senha, hash)

    return result
}