import { DatabaseModel } from "./DatabaseModel";

// armazenei o pool de conexões
const database = new DatabaseModel().pool;

/**
 * Classe que representa um Aluno.
 */
export class Usuario {

    /* Atributos */
    /* Identificador do aluno */
    private idUsuario: number = 0;
    /* ra do aluno */
    private nome: string;
    /* nome do aluno */
    private email: string;
    /* sobrenome do carro */
    private celular: string;
    /* data de nascimento do aluno */
    private statusUsuario: boolean = true ;


    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do Aluno
     * @param email Sobrenome do Aluno
     * @param celular Data de Nascimento do Aluno
     */

    constructor(
        nome: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns o identificador do aluno
     */
    public getIdUsuario(): number {
        return this.idUsuario;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param idUsuario novo identificador do aluno
     */
    public setIdUsuario(idUsuario: number): void {
        this.idUsuario = idUsuario;
    }

    /**
         * Recupera o RA do aluno
         * @returns o RA do aluno
         */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Atribui um valor ao RA do aluno
     * @param ra novo RA do aluno
     */
    public setNome(nome: string): void {
        this.nome = nome
    }

    /**
     * Retorna o nome do Aluno.
     *
     * @returns {string} O nome do aluno.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o nome do aluno.
     * 
     * @param email - Nome do aluno a ser definido.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns {string} O sobrenome do aluno.
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o sobrenome do aluno.
     *
     * @param sobrenome - O sobrenome do aluno.
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns {string} O sobrenome do aluno.
     */
    public getStatusUsuario(): boolean {
        return this.statusUsuario;
    }

    /**
     * Define o sobrenome do aluno.
     *
     * @param statusUsuario - O sobrenome do aluno.
     */
    public setStatusUsuario(statusUsuario: boolean): void {
        this.statusUsuario = statusUsuario;
    }


    /**
     * Busca e retorna uma lista de carros do banco de dados.
     * @returns Um array de objetos do tipo `Aluno` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     * 
     * - A função realiza uma consulta SQL para obter todas as informações da tabela "aluno".
     * - Os dados retornados do banco de dados são usados para instanciar objetos da classe ``.
     * - Cada carro é adicionado a uma lista que será retornada ao final da execução.
     * - Se houver falha na consulta ao banco, a função captura o erro, exibe uma mensagem no console e retorna `null`.
     */
    static async listagemUsuario(): Promise<Array<Usuario> | null> {
        // objeto para armazenar a lista de alunos
        const listaDeUsuarios: Array<Usuario> = [];

        try {
            // query de consulta ao banco de dados
            const querySelectUsuario = `SELECT * FROM usuario WHERE status_usuario = TRUE;`;

            // fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectUsuario);

            // usando a resposta para instanciar um objeto do tipo aluno
            respostaBD.rows.forEach((linha: any) => {
                // instancia (cria) objeto aluno
                const novoUsuario = new Usuario(
                    linha.nome,
                    linha.email,
                    linha.celular
                );

                // atribui o ID objeto
                novoUsuario.setIdUsuario(linha.id_usuario);

                novoUsuario.setStatusUsuario(linha.status_usuario);

                // adiciona o objeto na lista
                listaDeUsuarios.push(novoUsuario);
            });

            // retorna a lista de carros
            return listaDeUsuarios;
        } catch (error) {
            console.log('Erro ao buscar lista de usuarios');
            return null;
        }
    }

    /**
     * Realiza o cadastro de um carro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (nome, sobrenome, dataNascimento, endereço, email e telefone)
     * na tabela `Aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Usuario} usuario - Objeto contendo os dados do carro que será cadastrado. O objeto `Aluno`
     *                        deve conter os métodos `getNome()`, `getSobrenome()`, `getDataNascimento()`, `getEmail()` e `getCelular()`
     *                        que retornam os respectivos valores do aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroUsuario(usuario: Usuario): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const queryInsertUsuario = `INSERT INTO usuario (nome, email, celular)
                                        VALUES
                                        ('${usuario.getNome()}', 
                                        '${usuario.getEmail()}',
                                        '${usuario.getCelular()}')
                                        RETURNING id_usuario;`;

            console.log(queryInsertUsuario);

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertUsuario);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do usuario: ${respostaBD.rows[0].id_usuario}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o usuario. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }


    static async removerUsuario(id_usuario: number): Promise<boolean> {

        let queryResult = false;

        try {
            // Cria a consulta (query) para remover o aluno
            const queryDeleteIaUsuario = `UPDATE ia
                                            SET status_ia = FALSE
                                            WHERE id_usuario=${id_usuario};`;

            // remove os emprestimos associado ao aluno
            await database.query(queryDeleteIaUsuario);

            // Construção da query SQL para deletar o Aluno.
            const queryDeleteUsuario = `UPDATE usuario 
                                            SET status_usuario = FALSE
                                            WHERE id_usuario =${id_usuario};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteUsuario)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                    }
                });

            // retorna o resultado da query
            return queryResult;

            // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }

    static async atualizarUsuario(usuario: Usuario): Promise<boolean> {
        try {
            // query para fazer update de um aluno no banco de dados
            const queryUpdateUsuario = `UPDATE usuario
                                    SET nome = '${usuario.getNome()}', 
                                        email = '${usuario.getEmail()}',
                                        celular = '${usuario.getCelular()}'
                                    WHERE id_usuario = ${usuario.getIdUsuario()};`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryUpdateUsuario);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno atualizado com sucesso! ID do usuario: ${usuario.getIdUsuario()}`);
                // true significa que a atualização foi bem sucedida
                return true;
            }
            // false significa que a atualização NÃO foi bem sucedida.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao atualizar o usuario. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}

