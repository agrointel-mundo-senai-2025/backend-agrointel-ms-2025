import { Request, Response, Router } from "express";
import {UsuarioController}  from "./controller/UsuarioController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Aplicação on-line" });
});

//ROTAS DOS CLIENTES

// Rota para listar os clientes
router.get("/lista/usuarios", UsuarioController.todos);
// Rota para criar um cliente
router.post("/novo/usuario", UsuarioController.novo);
// Rota para atualizar um cliente
router.put("/delete/usuario/:idUsuario", UsuarioController.remover);
// Rota para deletar um cliente
router.put("/atualizar/usuario/:idUsuario", UsuarioController.atualizar);

export { router };