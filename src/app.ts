import { DatabaseModel } from "./model/DatabaseModel";
import { server } from "./server";
import dotenv from 'dotenv';

const port: number = parseInt(process.env.SERVER_PORT as string);

new DatabaseModel().testeConexao().then((resdb) => {
    if(resdb){
        console.log('Conexão com banco de dados realizada com sucesso.');
        // iniciando o servidor
        server.listen(port, ()  => {
            console.log(`Servidor iniciado no endereço http://localhost:${process.env.SERVER_EXPOSED_PORT}`);
        });
    } else{
        console.log('Erro ao conectar ao banco de dados.');
    }
});