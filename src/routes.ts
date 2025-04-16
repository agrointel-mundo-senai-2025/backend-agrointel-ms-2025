import { Request, Response, Router } from "express";
import {UsuarioController}  from "./controller/UsuarioController";
import { ChatIAController } from "./controller/ChatIAController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Aplicação on-line" });
});

//ROTAS DOS USUARIO

// Rota para listar os usuarios
router.get("/lista/usuarios", UsuarioController.todos);
// Rota para criar um usuario
router.post("/novo/usuario", UsuarioController.novo);
// Rota para atualizar um usuario
router.put("/delete/usuario/:idUsuario", UsuarioController.remover);
// Rota para deletar um usuario
router.put("/atualizar/usuario/:idUsuario", UsuarioController.atualizar);

// Rota para listar os chat
router.get("/lista/chat", ChatIAController.todos);
// Rota para criar um usuario
router.post("/novo/chat", ChatIAController.novo);
// Rota para atualizar um usuario
router.put("/delete/chat/:idChatIA", ChatIAController.remover);

export { router };