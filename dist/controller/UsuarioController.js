"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const Usuario_1 = require("../model/Usuario"); // Importa a classe Usuario do model
/**
 * Classe controladora que lida com as requisições HTTP relacionadas aos usuários.
 * Ela herda da classe Usuario, então pode usar seus métodos diretamente.
 */
class UsuarioController extends Usuario_1.Usuario {
    /**
    * Lista todos os usuários cadastrados e ativos.
    * @param req Objeto da requisição HTTP.
    * @param res Objeto da resposta HTTP.
    * @returns Lista de usuários em formato JSON com status 200 ou erro 400 se falhar.
    */
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Chama o método da classe Usuario para listar todos os usuários
                const listaDeUsuarios = yield Usuario_1.Usuario.listagemUsuario();
                // Envia a lista como resposta com status 200 (OK)
                return res.status(200).json(listaDeUsuarios);
            }
            catch (error) {
                // Loga erro no console
                console.log('Erro ao acessar listagem de usuario');
                // Retorna erro ao cliente com status 400
                return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de usuario" });
            }
        });
    }
    /**
    * Cadastra um novo usuário no banco de dados.
    * @param req Requisição HTTP com os dados do usuário no body.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static novo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrai os dados do corpo da requisição e monta um objeto UsuarioDTO
                const UsuarioRecebido = req.body;
                console.log(UsuarioRecebido); // Debug
                // Cria uma nova instância de Usuario com os dados recebidos
                const novoUsuario = new Usuario_1.Usuario(UsuarioRecebido.nome, UsuarioRecebido.email, UsuarioRecebido.celular);
                console.log(Usuario_1.Usuario); // Debug
                // Chama o método de cadastro passando o novo usuário
                const repostaClasse = yield Usuario_1.Usuario.cadastroUsuario(novoUsuario);
                // Se cadastrou com sucesso, retorna status 200
                if (repostaClasse) {
                    return res.status(200).json({ mensagem: "Usuario cadastrado com sucesso!" });
                }
                else {
                    // Caso contrário, retorna erro com status 400
                    return res.status(400).json({ mensagem: "Erro ao cadastra o usuario. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // Loga erro no console
                console.log(`Erro ao cadastrar um usuario. ${error}`);
                // Retorna erro com status 400
                return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuario. Entre em contato com o administrador do sistema." });
            }
        });
    }
    /**
    * Remove (desativa) um usuário com base no ID recebido como parâmetro.
    * @param req Requisição HTTP com o idUsuario na URL.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Converte o idUsuario da URL para número inteiro
                const idUsuario = parseInt(req.params.idUsuario);
                // Chama o método da classe para remover (desativar) o usuário
                const respostaModelo = yield Usuario_1.Usuario.removerUsuario(idUsuario);
                // Se a remoção for bem-sucedida
                if (respostaModelo) {
                    return res.status(200).json({ mensagem: "Usuario removido com sucesso!" });
                }
                else {
                    return res.status(400).json({ mensagem: "Erro ao remover o usuario. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // Loga erro no console
                console.log(`Erro ao remover um Usuario. ${error}`);
                // Retorna erro com status 400
                return res.status(400).json({ mensagem: "Não foi possível remover o Usuario. Entre em contato com o administrador do sistema." });
            }
        });
    }
    /**
    * Atualiza os dados de um usuário.
    * @param req Requisição HTTP com o idUsuario na URL e novos dados no body.
    * @param res Resposta HTTP com mensagem de sucesso ou erro.
    */
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Pega o id do usuário da URL e transforma em número
                const idUsuario = parseInt(req.params.idUsuario);
                // Pega os dados novos do corpo da requisição
                const UsuarioRecebido = req.body;
                // Cria um novo objeto Usuario com os dados atualizados
                const UsuarioAtualizado = new Usuario_1.Usuario(UsuarioRecebido.nome, UsuarioRecebido.email, UsuarioRecebido.celular);
                // Define o ID que será atualizado
                UsuarioAtualizado.setIdUsuario(idUsuario);
                // Chama o método que faz o update no banco
                const resposta = yield Usuario_1.Usuario.atualizarUsuario(UsuarioAtualizado);
                // Verifica se a atualização foi bem-sucedida
                if (resposta) {
                    return res.status(200).json({ mensagem: "Usuario atualizado com sucesso!" });
                }
                else {
                    return res.status(400).json({ mensagem: "Erro ao atualizar o usuario. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // Loga o erro
                console.log(`Erro ao atualizar um usuario. ${error}`);
                // Retorna erro com status 400
                return res.status(400).json({ mensagem: "Não foi possível atualizar o usuario. Entre em contato com o administrador do sistema." });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map