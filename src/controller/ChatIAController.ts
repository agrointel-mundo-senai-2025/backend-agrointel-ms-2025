import { Request, Response } from "express"; // Importa os tipos do Express para tratar requisições e respostas HTTP
import { ChatIA } from "../model/ChatIA";

// Interface que define a estrutura esperada dos dados de um chat na requisição
interface ChatIADTO {
    idUsuario: number,
    pergunta: string,
    resposta: string,
}

/**
 * Classe controladora que lida com as requisições HTTP relacionadas ao Chat com IA.
 * Ela estende a classe ChatIA, então pode usar seus métodos diretamente.
 */
export class ChatIAController extends ChatIA {

    /**
    * Lista todos os registros de chat com IA cadastrados.
    * @param req Objeto da requisição HTTP.
    * @param res Objeto da resposta HTTP.
    * @returns Lista de chats em formato JSON com status 200 ou erro 400 se falhar.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método da classe ChatIA para listar todos os registros
            const listaDeChatIA = await ChatIA.listagemChatIA();

            // Envia a lista como resposta com status 200 (OK)
            return res.status(200).json(listaDeChatIA);
        } catch (error) {
            // Loga erro no console
            console.log('Erro ao acessar listagem do chat');

            // Retorna erro ao cliente com status 400
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de chats" });
        }
    }

    /**
    * Cadastra um novo registro de chat no banco de dados.
    * @param req Requisição HTTP com os dados do chat no body.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // Extrai os dados do corpo da requisição e monta um objeto ChatIADTO
            const ChatRecebido: ChatIADTO = req.body;
            console.log(ChatRecebido); // Debug

            // Cria uma nova instância de ChatIA com os dados recebidos
            const novoChatIA = new ChatIA(
                ChatRecebido.idUsuario,
                ChatRecebido.pergunta,
                ChatRecebido.resposta
            );

            console.log(novoChatIA); // Debug

            // Chama o método de cadastro passando o novo chat
            const repostaClasse = await ChatIA.criarChat(novoChatIA);

            // Se cadastrou com sucesso, retorna status 200
            if (repostaClasse) {
                return res.status(200).json({ mensagem: "Chat cadastrado com sucesso!" });
            } else {
                // Caso contrário, retorna erro com status 400
                return res.status(400).json({ mensagem: "Erro ao cadastrar o chat. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga erro no console
            console.log(`Erro ao cadastrar um chat. ${error}`);

            // Retorna erro com status 400
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o chat. Entre em contato com o administrador do sistema." });
        }
    }

    /**
    * Remove (desativa) um registro de chat com base no ID recebido como parâmetro.
    * @param req Requisição HTTP com o id do chat na URL.
    * @param res Resposta HTTP para retornar sucesso ou erro.
    */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // Converte o id do chat da URL para número inteiro
            const idChatIA = parseInt(req.params.idChatIA);

            // Chama o método da classe para remover (desativar) o chat
            const respostaModelo = await ChatIA.removerChatIA(idChatIA);

            // Se a remoção for bem-sucedida
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Chat removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o chat. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Loga erro no console
            console.log(`Erro ao remover um chat. ${error}`);

            // Retorna erro com status 400
            return res.status(400).json({ mensagem: "Não foi possível remover o chat. Entre em contato com o administrador do sistema." });
        }
    }
}
