import db from '../services/db'

interface IEmpresa {
    id: number,
    nome: string,
    razao_social: string,
    cnpj: string,
    email: string,
    tel: string
}

const empresa = (id: number, nome: string, razao_social: string, cnpj: string, email: string, tel: string) =>{
    return <IEmpresa>{id, nome, razao_social, cnpj, email, tel}
}

export default empresa

export async function getEmpresa(id: number){
    const DB = await db();

    return new Promise<IEmpresa>((resolve, reject) => {
        DB.query(`SELECT * FROM empresas WHERE id = ${id}`, (err, result) => {
            if(err) reject(err)
           resolve(empresa(result[0].id, result[0].nome, result[0].razao_social, result[0].cnpj, result[0].email, result[0].tel))
        })
    })
}

export async function InsertEmpresa(nome: string, razao_social: string, cnpj: string, email: string, tel: string){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        const sqlQuery = `INSERT INTO empresas (nome, razao_social, cnpj, email, tel) VALUES ('${nome}', '${razao_social}', '${cnpj}', '${email}', '${tel}')`;
        DB.query(sqlQuery, (err, result) => {
            if(err){
                resolve(false)
                throw err
            }
           resolve(true)
        })
    })
}

export async function UpdateEmpresa(id: number, nome: string, razao_social: string, cnpj: string, email: string, tel: string){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`UPDATE empresas SET nome = '${nome}', razao_social = '${razao_social}', cnpj = '${cnpj}', email = '${email}', tel = '${tel}' WHERE id = ${id};`, (err, result) => {
            if(err) reject(false)
            
            resolve(true)
        })
    })
}

/*export async function getEmpresas(){
    const DB = await db();

    return new Promise<{nome: String, email: String, cpf: String}[]>((resolve, reject) => {
        DB.query(`SELECT * FROM empresas`, (err, result) => {
            if(err) reject(err)
           resolve(result.map((clienteL: { id: number, nome: string, descricao: string, valor: number}) => {
               return {id: clienteL.id, nome: clienteL.nome, descrição: clienteL.descricao, valor: clienteL.valor}
           }))
        })
    })
}*/