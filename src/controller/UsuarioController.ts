import { Request, Response } from "express";
import  {Usuario}  from "../model/Usuario";

interface UsuarioDTO {
    nome: string,
    email: string,
    celular: string
}

/**
 * A classe `AlunoController` estende a classe `Aluno` e é responsável por controlar as requisições relacionadas aos alunos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "aluno".
 * - Herdando de `Aluno`, ela pode acessar métodos e propriedades da classe base.
 */
export class UsuarioController extends Usuario {
    /**
    * Lista todos os alunos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de alunos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de alunos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os alunos e armazena o resultado
            const listaDeUsuarios = await Usuario.listagemUsuario();

            // retorna a lista de alunos há quem fez a requisição web
            return res.status(200).json(listaDeUsuarios);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de usuario');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de usuario" });
        }
    }

    /**
    * Método controller para cadastrar um novo aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
    * e tenta cadastrar este aluno no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno no formato `AlunoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const UsuarioRecebido: UsuarioDTO = req.body;
            console.log(UsuarioRecebido);


            // instanciando um objeto do tipo aluno com as informações recebidas
            const novoUsuario = new Usuario(UsuarioRecebido.nome,
                UsuarioRecebido.email,
                UsuarioRecebido.celular,
            );

            console.log(Usuario);


            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Usuario.cadastroUsuario(novoUsuario);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Usuario cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o usuario. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um usuario. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuario. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do Aluno que será removido
            const idUsuario = parseInt(req.params.idUsuario as string);

            // chamando a função de remoção de Aluno
            const respostaModelo = await Usuario.removerUsuario(idUsuario);

            // verificando a resposta da função
            if (respostaModelo) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Usuario removido com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao remover o usuario. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao remover um Usuario. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível remover o Usuario. Entre em contato com o administrador do sistema." });
        }
    }
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // recuperando o id do Aluno que será atualizado
            const idUsuario = parseInt(req.params.idUsuario as string);

            // recuperando as informações do Aluno que serão atualizadas
            const UsuarioRecebido: UsuarioDTO = req.body;

            // instanciando um objeto do tipo Aluno com as informações recebidas
            const UsuarioAtualizado = new Usuario(UsuarioRecebido.nome,
                UsuarioRecebido.email,
                UsuarioRecebido.celular);

            // setando o id do Aluno que será atualizado
            UsuarioAtualizado.setIdUsuario(idUsuario);

            // chamando a função de atualização de Aluno
            const resposta = await Usuario.atualizarUsuario(UsuarioAtualizado);

            // verificando a resposta da função
            if (resposta) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Usuario atualizado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o usuario. Entre em contato com o administrador do sistema." })
            }
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um usuario. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível atualizar o usuario. Entre em contato com o administrador do sistema." });
        }
    }
}