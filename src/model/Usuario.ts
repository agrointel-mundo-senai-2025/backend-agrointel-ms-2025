import { DatabaseModel } from "./DatabaseModel";

// Cria uma instância da classe DatabaseModel e pega o pool de conexões com o banco
const database = new DatabaseModel().pool;

/**
 * Classe que representa um Usuario
 */
export class Usuario {

    /* Atributos */

    // Identificador do usuário (inicialmente 0)
    private idUsuario: number = 0;

    // Nome do usuário
    private nome: string;

    // Email do usuário
    private email: string;

    // Celular do usuário
    private celular: string;

    // Status do usuário (true = ativo, false = inativo)
    private statusUsuario: boolean = true ;

    /**
     * Construtor da classe Usuario
     * 
     * @param nome Nome do usuário
     * @param email Email do usuário
     * @param celular Celular do usuário
     */
    constructor(
        nome: string,
        email: string,
        celular: string
    ) {
        // Atribui os valores passados para os atributos
        this.nome = nome;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */

    // Retorna o ID do usuário
    public getIdUsuario(): number {
        return this.idUsuario;
    }

    // Define um novo ID para o usuário
    public setIdUsuario(idUsuario: number): void {
        this.idUsuario = idUsuario;
    }

    // Retorna o nome do usuário
    public getNome(): string {
        return this.nome;
    }

    // Define um novo nome para o usuário
    public setNome(nome: string): void {
        this.nome = nome
    }

    // Retorna o email do usuário
    public getEmail(): string {
        return this.email;
    }

    // Define um novo email para o usuário
    public setEmail(email: string): void {
        this.email = email;
    }

    // Retorna o celular do usuário
    public getCelular(): string {
        return this.celular;
    }

    // Define um novo celular para o usuário
    public setCelular(celular: string): void {
        this.celular = celular;
    }

    // Retorna o status do usuário (ativo ou inativo)
    public getStatusUsuario(): boolean {
        return this.statusUsuario;
    }

    // Define o status do usuário
    public setStatusUsuario(statusUsuario: boolean): void {
        this.statusUsuario = statusUsuario;
    }

    /**
     * Lista todos os usuários ativos do banco de dados.
     * 
     * @returns Lista de objetos Usuario ou null se der erro.
     */
    static async listagemUsuario(): Promise<Array<Usuario> | null> {
        // Cria uma lista para armazenar os usuários
        const listaDeUsuarios: Array<Usuario> = [];

        try {
            // Monta a query que busca todos os usuários ativos
            const querySelectUsuario = `SELECT * FROM usuario WHERE status_usuario = TRUE;`;

            // Executa a query e pega o resultado
            const respostaBD = await database.query(querySelectUsuario);

            // Para cada linha do resultado, cria um novo objeto Usuario
            respostaBD.rows.forEach((linha: any) => {
                const novoUsuario = new Usuario(
                    linha.nome,
                    linha.email,
                    linha.celular
                );

                // Define o ID e status no objeto
                novoUsuario.setIdUsuario(linha.id_usuario);
                novoUsuario.setStatusUsuario(linha.status_usuario);

                // Adiciona o objeto à lista
                listaDeUsuarios.push(novoUsuario);
            });

            // Retorna a lista completa
            return listaDeUsuarios;
        } catch (error) {
            // Em caso de erro, mostra no console e retorna null
            console.log('Erro ao buscar lista de usuarios');
            return null;
        }
    }

    /**
     * Cadastra um novo usuário no banco de dados.
     * 
     * @param usuario Objeto Usuario com os dados a serem salvos
     * @returns true se cadastrou com sucesso, false se deu ruim
     */
    static async cadastroUsuario(usuario: Usuario): Promise<boolean> {
        try {
            // Monta a query de insert com os dados do objeto
            const queryInsertUsuario = `INSERT INTO usuario (nome, email, celular)
                                        VALUES
                                        ('${usuario.getNome()}', 
                                        '${usuario.getEmail()}',
                                        '${usuario.getCelular()}')
                                        RETURNING id_usuario;`;

            // Mostra a query no console (debug)
            console.log(queryInsertUsuario);

            // Executa a query
            const respostaBD = await database.query(queryInsertUsuario);

            // Se conseguiu inserir, rowCount vai ser diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do usuario: ${respostaBD.rows[0].id_usuario}`);
                return true;
            }

            // Se não inseriu nada, retorna false
            return false;

        } catch (error) {
            // Se der erro, mostra a mensagem no console
            console.log('Erro ao cadastrar o usuario. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    /**
     * Desativa o usuário e também registros relacionados na tabela 'ia'
     * 
     * @param id_usuario ID do usuário a ser removido (soft delete)
     * @returns true se deu certo, false se não
     */
    static async removerUsuario(id_usuario: number): Promise<boolean> {

        let queryResult = false;

        try {
            // Desativa os registros da tabela ia relacionados ao usuário
            const queryDeleteIaUsuario = `UPDATE chat_ia
                                            SET status_chat_ia = FALSE
                                            WHERE id_usuario=${id_usuario};`;

            // Executa a query
            await database.query(queryDeleteIaUsuario);

            // Desativa o próprio usuário (soft delete)
            const queryDeleteUsuario = `UPDATE usuario 
                                            SET status_usuario = FALSE
                                            WHERE id_usuario =${id_usuario};`;

            // Executa a segunda query e verifica se deu certo
            await database.query(queryDeleteUsuario)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;

        } catch (error) {
            // Em caso de erro, loga e retorna false
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }

    /**
     * Atualiza os dados de um usuário no banco.
     * 
     * @param usuario Objeto com os novos dados
     * @returns true se atualizou, false se deu ruim
     */
    static async atualizarUsuario(usuario: Usuario): Promise<boolean> {
        try {
            // Monta a query de update com os dados atuais do objeto
            const queryUpdateUsuario = `UPDATE usuario
                                    SET nome = '${usuario.getNome()}', 
                                        email = '${usuario.getEmail()}',
                                        celular = '${usuario.getCelular()}'
                                    WHERE id_usuario = ${usuario.getIdUsuario()};`;

            // Executa a query
            const respostaBD = await database.query(queryUpdateUsuario);

            // Se atualizou alguma linha, deu certo
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno atualizado com sucesso! ID do usuario: ${usuario.getIdUsuario()}`);
                return true;
            }

            // Se não atualizou nada, retorna false
            return false;

        } catch (error) {
            // Loga erro e retorna false
            console.log('Erro ao atualizar o usuario. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }
}
