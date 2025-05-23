"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UsuarioController_1 = require("./controller/UsuarioController");
const ChatIAController_1 = require("./controller/ChatIAController");
const Auth_1 = require("./auth/Auth");
// import { CulturaController } from "./controller/CulturaController";
const CulturaController = require("./controller/CulturaController").CulturaController;
// Cria um roteador
const router = (0, express_1.Router)();
exports.router = router;
// Criando uma rota principal para a aplicação
router.get("/", (req, res) => {
    res.json({ mensagem: "Aplicação on-line" });
});
router.post('/login', Auth_1.Auth.validacaoUsuario);
//ROTAS DOS USUARIO
// Rota para listar os usuarios
router.get("/lista/usuarios", UsuarioController_1.UsuarioController.todos);
// Rota para criar um usuario
router.post("/novo/usuario", UsuarioController_1.UsuarioController.novo);
// Rota para atualizar um usuario
router.put("/delete/usuario/:idUsuario", UsuarioController_1.UsuarioController.remover);
// Rota para deletar um usuario
router.put("/atualizar/usuario/:idUsuario", UsuarioController_1.UsuarioController.atualizar);
// Rota para listar os chat
router.get("/lista/chat", ChatIAController_1.ChatIAController.todos);
// Rota para criar um usuario
router.post("/novo/chat", ChatIAController_1.ChatIAController.novo);
// Rota para atualizar um usuario
router.put("/delete/chat/:idChatIA", ChatIAController_1.ChatIAController.remover);
router.get('/lista/culturas', CulturaController.todos);
router.get('/cultura', CulturaController.cultura);
//# sourceMappingURL=routes.js.map