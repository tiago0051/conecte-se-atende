import jwt from 'jsonwebtoken'

import { loginEmpresa } from '../../../models/empresa';


export default async function Login(req, res){
    

    const {usuário, senha} = req.body;

    /*if(usuário === "tiago.salgado@devsoftbr.com" && senha === "@Abab232524"){
        var sql = 'INSERT INTO empresas (nome, razao_social, cnpj, email, tel, senha) VALUES ("Tiago", "Tiago", "123456789", "tiago.salgado@devsoftbr.com", "123456789", "'+encrypt(senha)+'")'
        DB.query(sql, (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.json({
                    "id": 1,
                    "nome": "Tiago",
                    "razao_social": "Tiago",
                    "cnpj": "123456789",
                    "email": usuário
                })
            }
        })
    }*/
    
    var empresa = await loginEmpresa(usuário, senha);

    console.log(empresa)

    if(empresa) {
        const token = jwt.sign({
            data: empresa.id
          }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        res.status(200).json({empresa, token})
    }else{
        res.status(400).json({
            "error": "Usuário ou senha inválidos"
        })
    }
}