import bcrypt from 'bcrypt'

import db from '../services/db'
import email from '../services/email'

interface IUsuário {
    id: number,
    user: String,
    nome: String,
    email: String,
}

interface IUsuárioEmpresa {
    id: number,
    user: String,
    nome: String,
    email: String,
    id_empresa: number,
    id_permissao: number
}

const usuário = (id: number, user: String, nome: String, email: String) =>{
    return <IUsuário>{id : id, user, nome, email}
}

const usuárioEmpresa = (id: number, user: String, nome: String, email: String, id_empresa: Number, id_permissao: Number) =>{
    return <IUsuárioEmpresa>{id : id, user, nome, email, id_empresa, id_permissao}
}

export default usuário

export async function getUsuário(id: number){
    const DB = await db();

    return new Promise<IUsuário>((resolve, reject) => {
        DB.query(`SELECT * FROM usuarios WHERE id = ${id};`, (err, result) => {
            if(err) reject(err)
            
            if(result.length > 0){
                resolve(usuário(result[0].id, result[0].user, result[0].nome, result[0].email))
            }else{
                reject(new Error('Usuário não encontrado'))
            }
        })
    })
}

export async function getUsuárioEmpresa(id: number, id_empresa : number){
    const DB = await db();

    return new Promise<IUsuárioEmpresa>((resolve, reject) => {
        DB.query(`SELECT usuarios.*, empresa_possui_usuario.id_empresa, empresa_possui_usuario.id_permissao FROM empresa_possui_usuario LEFT JOIN usuarios ON id_usuario = usuarios.id WHERE usuarios.id = ${id} AND empresa_possui_usuario.id_empresa = ${id_empresa}`, (err, result) => {
            if(err) return reject(err)
            
            if(result.length > 0){
                resolve(usuárioEmpresa(result[0].id, result[0].user, result[0].nome, result[0].email, result[0].id_empresa, result[0].id_permissao))
            }else{
                reject(new Error('Usuário não encontrado'))
            }
        })
    })
}

export async function getUsuárioByEmail(email: string){
    const DB = await db();

    return new Promise<IUsuário>((resolve, reject) => {
        DB.query(`SELECT * FROM usuarios WHERE email = '${email}';`, (err, result) => {
            if(err) reject(err)
           resolve(usuário(result[0].id, result[0].user, result[0].nome, result[0].email))
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
                      resolve(usuário(result[0].id, result[0].user, result[0].nome, result[0].email))
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

    var sql = `INSERT INTO usuarios (user, nome, email, id_tipo_acesso) VALUES ('${user}', '${nome}', '${email}', 1)`;

    return new Promise<IUsuário | null>((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err)resolve(null)

            const id_usuário = result.insertId

            if(result.insertId){
                DB.query(`INSERT INTO empresa_possui_usuario (id_empresa, id_usuario, id_permissao) VALUES ('${id_empresa}', ${result.insertId}, '${id_permissao}')`, (err, result) => {
                    if(err)reject(err)
                    
                    resolve(usuário(id_usuário, result.user, result.nome, result.email))
                })
            }else{
                resolve(null)
            }
        })
    })
}

export async function UpdateUsuário(id: number, user: String, nome: String, email: String){
    const DB = await db();

    var sql = `UPDATE usuarios SET user = '${user}', nome = '${nome}', email = '${email}' WHERE id = '${id}'`;

    return new Promise((resolve, reject) => {
        DB.query(sql, (err, result) => {
            if(err)return reject(err)

            if(result.affectedRows > 0){
                resolve(true)
            }else{
                reject(new Error('Usuário não encontrado'))
            }
        })
    })
}

export async function CadastrarSenhaUsuário(email: String, senha: string){
    const DB = await db();

    var sql = `UPDATE usuarios SET senha = '${encrypt(senha)}' WHERE email = '${email}'`;

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

export async function EnviarEmailVerificação(emailL: string, token: String){
    const info = await email.sendMail({
        from: '"Conect-se Atende" <verificacao@devsoftbr.com>',
        to: [emailL, "tiago.salgado@devsoftbr.com"],
        subject: 'Verificação de conta',
        text: `Olá, para verificar sua conta, clique no link abaixo:`,
        html: `<p>Olá, para verificar sua conta, clique no link abaixo: <br/> <a href="https://${process.env.VERCEL_URL}/empresa/login/recuperar_senha/${token}">Clique aqui</a></p>`
    })

    return info;
}

interface IEmpresa {
    id: number,
    nome: string,
    cnpj: string,
    id_permissao: number
}

export async function listarEmpresas(id_usuário: number){
    const DB = await db();

    return new Promise<IEmpresa[]>((resolve, reject) => {
        DB.query(`SELECT empresas.*, empresa_possui_usuario.id_permissao FROM empresa_possui_usuario LEFT JOIN empresas ON id_empresa = empresas.id WHERE id_usuario = ${id_usuário}`, (err, result) => {
            if(err) reject(err)
            
            if(result.length > 0){
                resolve(result.map((empresa: IEmpresa) => empresa))
            }else{
                resolve([])
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