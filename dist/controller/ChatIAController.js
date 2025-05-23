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
exports.ChatIAController = void 0;
const ChatIA_1 = require("../model/ChatIA");
/**
 * Classe controladora que lida com as requisições HTTP relacionadas ao Chat com IA.
 * Ela estende a classe ChatIA, então pode usar seus métodos diretamente.
 */
class ChatIAController extends ChatIA_1.ChatIA {
    /**
    * Lista todos os registros de chat com IA cadastrados.
    * @param req Objeto da requisição HTTP.
    * @param res Objeto da resposta HTTP.
    * @returns Lista de chats em formato JSON com status 200 ou erro 400 se falhar.
    */
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Chama o método da classe ChatIA para listar todos os registros
                const listaDeChatIA = yield ChatIA_1.ChatIA.listagemChatIA();
                // Envia a lista como resposta com status 200 (OK)
                return res.status(200).json(listaDeChatIA);
            }
            catch (error) {
                // Loga erro no console
                console.log('Erro ao acessar listagem do chat');
                // Retorna erro ao cliente com status 400
                return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de chats" });
            }
        });
    }
    /**
    * Cadastra um novo registro de chat no banco de dados.
    * @param req Requisição HTTP com os dados do chat no body.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static novo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrai os dados do corpo da requisição e monta um objeto ChatIADTO
                const ChatRecebido = req.body;
                console.log(ChatRecebido); // Debug
                // Cria uma nova instância de ChatIA com os dados recebidos
                const novoChatIA = new ChatIA_1.ChatIA(ChatRecebido.idUsuario, ChatRecebido.pergunta, ChatRecebido.resposta);
                console.log(novoChatIA); // Debug
                // Chama o método de cadastro passando o novo chat
                const repostaClasse = yield ChatIA_1.ChatIA.criarChat(novoChatIA);
                // Se cadastrou com sucesso, retorna status 200
                if (repostaClasse) {
                    return res.status(200).json({ mensagem: "Chat cadastrado com sucesso!" });
                }
                else {
                    // Caso contrário, retorna erro com status 400
                    return res.status(400).json({ mensagem: "Erro ao cadastrar o chat. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // Loga erro no console
                console.log(`Erro ao cadastrar um chat. ${error}`);
                // Retorna erro com status 400
                return res.status(400).json({ mensagem: "Não foi possível cadastrar o chat. Entre em contato com o administrador do sistema." });
            }
        });
    }
    /**
    * Remove (desativa) um registro de chat com base no ID recebido como parâmetro.
    * @param req Requisição HTTP com o id do chat na URL.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static remover(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Converte o id do chat da URL para número inteiro
                const idChatIA = parseInt(req.params.idChatIA);
                // Chama o método da classe para remover (desativar) o chat
                const respostaModelo = yield ChatIA_1.ChatIA.removerChatIA(idChatIA);
                // Se a remoção for bem-sucedida
                if (respostaModelo) {
                    return res.status(200).json({ mensagem: "Chat removido com sucesso!" });
                }
                else {
                    return res.status(400).json({ mensagem: "Erro ao remover o chat. Entre em contato com o administrador do sistema." });
                }
            }
            catch (error) {
                // Loga erro no console
                console.log(`Erro ao remover um chat. ${error}`);
                // Retorna erro com status 400
                return res.status(400).json({ mensagem: "Não foi possível remover o chat. Entre em contato com o administrador do sistema." });
            }
        });
    }
}
exports.ChatIAController = ChatIAController;
//# sourceMappingURL=ChatIAController.js.map