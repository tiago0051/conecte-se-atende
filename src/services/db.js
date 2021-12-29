import MySql from 'mysql';

let connection;

export default async function DB(){
    if(!(connection && connection.state === 'connected')){
        connection = await MySql.createConnection("mysql://"+ process.env.PLANETSCALE_DB_USERNAME +":"+ process.env.PLANETSCALE_DB_PASSWORD +"@"+ process.env.PLANETSCALE_DB_HOST +"/"+ process.env.PLANETSCALE_DB_DATABASE +"?ssl=true");
    
        await connection.connect();
    }

    return connection;
}