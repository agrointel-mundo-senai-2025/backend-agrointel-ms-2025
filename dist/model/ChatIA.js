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
exports.ChatIA = void 0;
const DatabaseModel_1 = require("./DatabaseModel");
// Instancia o pool de conexões com o banco de dados
const database = new DatabaseModel_1.DatabaseModel().pool;
/**
 * Classe que representa a interação do usuário com a IA.
 */
class ChatIA {
    /**
     * Construtor da classe ChatIA
     *
     * @param idUsuario ID do usuário que fez a pergunta
     * @param idExigenciaCulturais ID da exigência cultural associada
     * @param pergunta Pergunta feita pelo usuário
     * @param resposta Resposta gerada pela IA
     */
    constructor(idUsuario, 
    // idExigenciaCulturais: number,
    pergunta, resposta) {
        /* Atributos */
        // Identificador do chat com a IA
        this.idChatIA = 0;
        // Identificador do usuário que fez a pergunta
        this.idUsuario = 0;
        // Status do chat (true = ativo, false = inativo)
        this.statusChatIA = true;
        this.idUsuario = idUsuario;
        // this.idExigenciaCulturais = idExigenciaCulturais;
        this.pergunta = pergunta;
        this.resposta = resposta;
    }
    /* Métodos Getters e Setters */
    /**
     * Recupera o ID do chat com a IA
     * @returns ID do chat
     */
    getIdChatIA() {
        return this.idChatIA;
    }
    /**
     * Define o ID do chat com a IA
     * @param idChatIA novo ID do chat
     */
    setIdChatIA(idChatIA) {
        this.idChatIA = idChatIA;
    }
    /**
     * Recupera o ID do usuário
     * @returns ID do usuário
     */
    getIdUsuario() {
        return this.idUsuario;
    }
    /**
     * Define o ID do usuário
     * @param idUsuario novo ID do usuário
     */
    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }
    //{NÃO IMPLEMENTADO AINDA (PQ NÃO TEM EXIGÊNCIA CULTURAL NO BANCO DE DADOS)}
    // /**
    //  * Recupera o ID da exigência cultural
    //  * @returns ID da exigência cultural
    //  */
    // public getidExigenciaCulturais(): number {
    //     return this.idExigenciaCulturais;
    // }
    // /**
    //  * Define o ID da exigência cultural
    //  * @param idExigenciaCulturais novo ID da exigência cultural
    //  */
    // public setidExigenciaCulturais(idExigenciaCulturais: number): void {
    //     this.idExigenciaCulturais = idExigenciaCulturais;
    // }
    /**
     * Recupera a pergunta feita pelo usuário
     * @returns pergunta
     */
    getPergunta() {
        return this.pergunta;
    }
    /**
     * Define a pergunta feita pelo usuário
     * @param pergunta nova pergunta
     */
    setPergunta(pergunta) {
        this.pergunta = pergunta;
    }
    /**
     * Recupera a resposta da IA
     * @returns resposta
     */
    getResposta() {
        return this.resposta;
    }
    /**
     * Define a resposta da IA
     * @param resposta nova resposta
     */
    setResposta(resposta) {
        this.resposta = resposta;
    }
    /**
     * Recupera o status do chat (ativo/inativo)
     * @returns status do chat
     */
    getStatusChatIA() {
        return this.statusChatIA;
    }
    /**
     * Define o status do chat (ativo/inativo)
     * @param statusChatIA novo status
     */
    setStatusChatIA(statusChatIA) {
        this.statusChatIA = statusChatIA;
    }
    /**
     * Busca e retorna uma lista de chats IA do banco de dados.
     *
     * @returns Um array de objetos `ChatIA` em caso de sucesso ou `null` se ocorrer erro.
     */
    static listagemChatIA() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaDeChatIA = [];
            try {
                const querySelectUsuario = `SELECT * FROM Chat_IA WHERE status_chat_ia = true;`;
                const respostaBD = yield database.query(querySelectUsuario);
                respostaBD.rows.forEach((linha) => {
                    const novoChatIA = new ChatIA(linha.id_usuario, linha.pergunta, linha.resposta);
                    novoChatIA.setIdChatIA(linha.id_chat_ia);
                    novoChatIA.setStatusChatIA(linha.status_chat_ia);
                    listaDeChatIA.push(novoChatIA);
                });
                return listaDeChatIA;
            }
            catch (error) {
                console.log('Erro ao buscar lista de chats IA:', error);
                return null;
            }
        });
    }
    /**
     * Realiza o cadastro de um novo chat IA no banco de dados.
     *
     * @param chatIA Objeto ChatIA a ser cadastrado.
     * @returns `true` se o cadastro for bem-sucedido, `false` caso contrário.
     */
    static criarChat(chatIA) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryInsertChatIA = `INSERT INTO chat_ia (id_usuario, pergunta, resposta) VALUES(
                                        ${chatIA.getIdUsuario()}, 
                                        '${chatIA.getPergunta()}', 
                                        '${chatIA.getResposta()}')
                                        RETURNING id_chat_ia;`;
                console.log(queryInsertChatIA);
                const respostaBD = yield database.query(queryInsertChatIA);
                if (respostaBD.rowCount != 0) {
                    console.log(`Chat IA cadastrado com sucesso! ID: ${respostaBD.rows[0].id_chat_ia}`);
                    return true;
                }
                return false;
            }
            catch (error) {
                console.log('Erro ao cadastrar o chat IA:', error);
                return false;
            }
        });
    }
    /**
     * Altera o status de um chat IA para inativo (remoção lógica).
     *
     * @param id_chat_ia ID do chat IA a ser desativado.
     * @returns `true` se a operação for bem-sucedida, `false` caso contrário.
     */
    static removerChatIA(id_chat_ia) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = false;
            try {
                const queryDeleteChatIA = `UPDATE chat_ia 
                                       SET status_chat_ia = FALSE
                                       WHERE id_chat_ia = ${id_chat_ia};`;
                yield database.query(queryDeleteChatIA)
                    .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });
                return queryResult;
            }
            catch (error) {
                console.log(`Erro ao desativar chat IA: ${error}`);
                return queryResult;
            }
        });
    }
}
exports.ChatIA = ChatIA;
//# sourceMappingURL=ChatIA.js.map