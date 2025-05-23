"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseModel_1 = require("./model/DatabaseModel");
const server_1 = require("./server");
const port = parseInt(process.env.SERVER_PORT || '3000');
new DatabaseModel_1.DatabaseModel().testeConexao().then((resdb) => {
    if (resdb) {
        console.log('Conexão com banco de dados realizada com sucesso.');
        // iniciando o servidor
        server_1.server.listen(port, () => {
            console.log(`Servidor iniciado no endereço http://localhost:${process.env.SERVER_EXPOSED_PORT}`);
        });
    }
    else {
        console.log('Erro ao conectar ao banco de dados.');
    }
});
//# sourceMappingURL=app.js.map