import { DatabaseModel } from "./DatabaseModel";

// Instancia o pool de conexões com o banco de dados
const database = new DatabaseModel().pool;

/**
 * Classe que representa a interação do usuário com a IA.
 */
export class ChatIA {

    /* Atributos */

    // Identificador do chat com a IA
    private idChatIA: number = 0;

    // Identificador do usuário que fez a pergunta
    private idUsuario: number = 0;

    // Identificador da exigência cultural associada à pergunta
    // private idExigenciaCulturais: number = 0;

    // Pergunta feita pelo usuário
    private pergunta: string;

    // Resposta gerada pela IA
    private resposta: string;

    // Status do chat (true = ativo, false = inativo)
    private statusChatIA: boolean = true;

    /**
     * Construtor da classe ChatIA
     * 
     * @param idUsuario ID do usuário que fez a pergunta
     * @param idExigenciaCulturais ID da exigência cultural associada
     * @param pergunta Pergunta feita pelo usuário
     * @param resposta Resposta gerada pela IA
     */
    constructor(
        idUsuario: number,
        // idExigenciaCulturais: number,
        pergunta: string,
        resposta: string,
    ) {
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
    public getIdChatIA(): number {
        return this.idChatIA;
    }

    /**
     * Define o ID do chat com a IA
     * @param idChatIA novo ID do chat
     */
    public setIdChatIA(idChatIA: number): void {
        this.idChatIA = idChatIA;
    }

    /**
     * Recupera o ID do usuário
     * @returns ID do usuário
     */
    public getIdUsuario(): number {
        return this.idUsuario;
    }

    /**
     * Define o ID do usuário
     * @param idUsuario novo ID do usuário
     */
    public setIdUsuario(idUsuario: number): void {
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
    public getPergunta(): string {
        return this.pergunta;
    }

    /**
     * Define a pergunta feita pelo usuário
     * @param pergunta nova pergunta
     */
    public setPergunta(pergunta: string): void {
        this.pergunta = pergunta;
    }

    /**
     * Recupera a resposta da IA
     * @returns resposta
     */
    public getResposta(): string {
        return this.resposta;
    }

    /**
     * Define a resposta da IA
     * @param resposta nova resposta
     */
    public setResposta(resposta: string): void {
        this.resposta = resposta;
    }

    /**
     * Recupera o status do chat (ativo/inativo)
     * @returns status do chat
     */
    public getStatusChatIA(): boolean {
        return this.statusChatIA;
    }

    /**
     * Define o status do chat (ativo/inativo)
     * @param statusChatIA novo status
     */
    public setStatusChatIA(statusChatIA: boolean): void {
        this.statusChatIA = statusChatIA;
    }

    /**
     * Busca e retorna uma lista de chats IA do banco de dados.
     * 
     * @returns Um array de objetos `ChatIA` em caso de sucesso ou `null` se ocorrer erro.
     */
    static async listagemChatIA(): Promise<Array<ChatIA> | null> {
        const listaDeChatIA: Array<ChatIA> = [];

        try {
            const querySelectUsuario = `SELECT * FROM Chat_IA WHERE status_chat_ia = true;`;
            const respostaBD = await database.query(querySelectUsuario);

            respostaBD.rows.forEach((linha: any) => {
                const novoChatIA = new ChatIA(
                    linha.id_usuario,
                    linha.pergunta,
                    linha.resposta,
                );
                novoChatIA.setIdChatIA(linha.id_chat_ia);
                novoChatIA.setStatusChatIA(linha.status_chat_ia);
                listaDeChatIA.push(novoChatIA);
            });

            return listaDeChatIA;
        } catch (error) {
            console.log('Erro ao buscar lista de chats IA:', error);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um novo chat IA no banco de dados.
     * 
     * @param chatIA Objeto ChatIA a ser cadastrado.
     * @returns `true` se o cadastro for bem-sucedido, `false` caso contrário.
     */
    static async criarChat(chatIA: ChatIA): Promise<boolean> {
        try {
            const queryInsertChatIA = `INSERT INTO chat_ia (id_usuario, pergunta, resposta) VALUES(
                                        ${chatIA.getIdUsuario()}, 
                                        '${chatIA.getPergunta()}', 
                                        '${chatIA.getResposta()}')
                                        RETURNING id_chat_ia;`;

            console.log(queryInsertChatIA);
            const respostaBD = await database.query(queryInsertChatIA);

            if (respostaBD.rowCount != 0) {
                console.log(`Chat IA cadastrado com sucesso! ID: ${respostaBD.rows[0].id_chat_ia}`);
                return true;
            }
            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o chat IA:', error);
            return false;
        }
    }

    /**
     * Altera o status de um chat IA para inativo (remoção lógica).
     * 
     * @param id_chat_ia ID do chat IA a ser desativado.
     * @returns `true` se a operação for bem-sucedida, `false` caso contrário.
     */
    static async removerChatIA(id_chat_ia: number): Promise<boolean> {
        let queryResult = false;

        try {
            const queryDeleteChatIA = `UPDATE chat_ia 
                                       SET status_chat_ia = FALSE
                                       WHERE id_chat_ia = ${id_chat_ia};`;

            await database.query(queryDeleteChatIA)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro ao desativar chat IA: ${error}`);
            return queryResult;
        }
    }
}
