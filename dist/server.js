"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
//Cria o servidor express
const server = (0, express_1.default)();
exports.server = server;
//Configura o servidor para aceitar requisições de outros domínios
server.use((0, cors_1.default)());
//Configura o servidor para aceitar requisições no formato JSON
server.use(express_1.default.json());
//Configurando as rotas no servidor
server.use(routes_1.router);
//# sourceMappingURL=server.js.map