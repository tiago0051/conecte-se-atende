import MySql from 'mysql';

export default async function DB(){
    const connection = MySql.createConnection({
        host: process.env.PLANETSCALE_DB_HOST,
        user: process.env.PLANETSCALE_DB_USERNAME,
        password: process.env.PLANETSCALE_DB_PASSWORD,
        database: process.env.PLANETSCALE_DB_DATABASE
    })
}