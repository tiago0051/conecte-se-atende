import db from '../services/db'

interface IEmpresa {
    id: number,
    nome : string,
    limite_clientes: number,
    limite_usuarios: number,
    total_clientes: number,
}

const empresa = (id: number, nome: string, limite_clientes: number, limite_usuarios: number, total_clientes: number) =>{
    return <IEmpresa>{id, nome, limite_clientes, limite_usuarios, total_clientes}
}

export default empresa

/*export async function getPlano(id: number){
    const DB = await db();

    return new Promise<IEmpresa>((resolve, reject) => {
        DB.query(`SELECT * FROM planos WHERE id = ${id}`, (err, result) => {
            if(err) reject(err)
           resolve(empresa(result[0].id, result[0].nome, result[0].limite_clientes, result[0].limite_usuarios))
        })
    })
}*/

export async function getPlanoByEmpresa(id_empresa: number){
    const DB = await db();

    return new Promise<IEmpresa | null>((resolve, reject) => {
            DB.query(`SELECT * FROM empresas INNER JOIN planos ON planos.id = id_plano WHERE empresas.id = '${id_empresa}'`, (err, result) => {
            if(err) reject(err)

            if(result.length === 0) return reject(new Error('Plano não encontrado'))

            DB.query(`SELECT count(*) FROM clientes WHERE id_empresa = ${id_empresa}`, (err, result2) => {
                if(err) reject(err)

                if(result.length === 0) return reject(new Error('Plano não encontrado'))

                return resolve(empresa(result[0].id, result[0].nome, result[0].limite_clientes, result[0].limite_usuarios, result2[0]['count(*)']))
            })
        })
    })
}

/*export async function InsertEmpresa(nome: string, razao_social: string, cnpj: string, email: string, tel: string){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        const sqlQuery = `INSERT INTO empresas (nome, razao_social, cnpj, email, tel, id_plano) VALUES ('${nome}', '${razao_social}', '${cnpj}', '${email}', '${tel}', 1)`;
        DB.query(sqlQuery, (err, result) => {
            if(err) return reject(err)

            if(!result.affectedRows) return reject(new Error("Não foi possível inserir a empresa"))
           resolve(true)
        })
    })
}*/

/*export async function UpdateEmpresa(id: number, nome: string, razao_social: string, cnpj: string, email: string, tel: string){
    const DB = await db();

    return new Promise<Boolean>((resolve, reject) => {
        DB.query(`UPDATE empresas SET nome = '${nome}', razao_social = '${razao_social}', cnpj = '${cnpj}', email = '${email}', tel = '${tel}' WHERE id = ${id};`, (err, result) => {
            if(err) reject(false)
            
            resolve(true)
        })
    })
}*/