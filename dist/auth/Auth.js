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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
// imports
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DatabaseModel_1 = require("../model/DatabaseModel");
const crypto_1 = __importDefault(require("crypto"));
// palavra secreta
const SECRET = 'bananinha';
// pool de conexão ao banco de dados
const database = new DatabaseModel_1.DatabaseModel().pool;
/**
 * Gera e trata um token de autenticação para o sistema
 */
class Auth {
    /**
     * Valida as credenciais do usuário no banco de dados
     * @param req Requisição com as informações do usuário
     * @param res Resposta enviada a quem requisitou o login
     * @returns Token de autenticação caso o usuário seja válido, mensagem de login não autorizado caso negativo
     */
    static validacaoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // recupera informações do corpo da requisição
            const { email, senha } = req.body;
            // query para validar email e senha informados pelo cliente
            const querySelectUser = `SELECT uuid_usuario, nome, email, senha FROM usuario WHERE email=$1 AND senha=$2 AND status_usuario=TRUE;`;
            try {
                // faz a requisição ao banco de dados
                const senhaCriptografada = crypto_1.default.createHash('sha1').update(senha).digest('hex');
                const queryResult = yield database.query(querySelectUser, [email.toUpperCase(), senhaCriptografada]);
                // verifica se a quantidade de linhas retornada foi diferente de 0
                // se foi, quer dizer que o email e senha fornecidos são iguais aos do banco de dados
                if (queryResult.rowCount != 0) {
                    // cria um objeto chamado professor com o id, nome e email. Essas informações serão devolvidas ao cliente
                    const usuario = {
                        uuid_usuario: queryResult.rows[0].uuid_usuario,
                        nome: queryResult.rows[0].nome,
                        email: queryResult.rows[0].email,
                        username: queryResult.rows[0].username
                    };
                    // Gera o token do usuário, passando como parâmetro as informações do objeto professor
                    const tokenUsuario = Auth.generateToken(parseInt(usuario.uuid_usuario), usuario.nome, usuario.username);
                    // retorna ao cliente o status de autenticação (verdadeiro), o token e o objeto professor
                    // tudo isso encapsulado em um JSON
                    return res.status(200).json({ auth: true, token: tokenUsuario, usuario: usuario });
                }
                else {
                    // caso a autenticação não tenha sido bem sucedida, é retornado ao cliente o statu de autenticação (falso), um token nulo e a mensagem de falha
                    return res.status(401).json({ auth: false, token: null, message: "Usuário e/ou senha incorretos" });
                }
                // verifica possíveis erros durante a requisição
            }
            catch (error) {
                console.log(`Erro no modelo: ${error}`);
                return res.status(500).json({ message: "Erro interno do servidor" });
            }
        });
    }
    /**
     * Gera token de validação do usuário
     *
     * @param id ID do usuário no banco de dados
     * @param nome Nome do usuário no banco de dados
     * @param email Email do usuário no banco de dados
     * @returns Token de autenticação do usuário
     */
    static generateToken(id, nome, username) {
        // retora o token gerado
        // id: ID do professor no banco de dados
        // nome: nome do professor no banco de dados
        // email: email do professor no banco de dados
        // SECRET: palavra secreta
        // expiresIn: tempo até a expiração do token (neste exemplo, 1 hora)
        return jsonwebtoken_1.default.sign({ id, nome, username }, SECRET, { expiresIn: '1h' });
    }
    /**
     * Verifica o token do usuário para saber se ele é válido
     *
     * @param req Requisição
     * @param res Resposta
     * @param next Próximo middleware
     * @returns Token validado ou erro
     */
    static verifyToken(req, res, next) {
        // recebe no cabeçalho da requisição do cliente o token que ele possui 
        const token = req.headers['x-access-token'];
        // verifica se nenhum token foi informado
        if (!token) {
            console.log('Token não informado');
            // se nenhum token foi informado, é enviada uma mensagem e o status de autenticação (falso)
            return res.status(401).json({ message: "Token não informado", auth: false }).end();
        }
        // verifica se o token recebido é válido
        jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
            if (err) {
                // verifica se o token já expirou
                if (err.name === 'TokenExpiredError') {
                    console.log('Token expirado');
                    // enviada uma mensagem e o status de autenticação (falso)
                    return res.status(401).json({ message: "Token expirado, faça o login novamente", auth: false }).end();
                }
                else {
                    console.log('Token inválido.');
                    // enviada uma mensagem e o status de autenticação (falso)
                    return res.status(401).json({ message: "Token inválido, faça o login", auth: false }).end();
                }
            }
            // desestrutura o objeto JwtPayload e armazena as informações exp e id em variáveis 
            const { exp, id } = decoded;
            // verifica se existe data de expiração ou o id no token que foi recebido pelo cliente
            if (!exp || !id) {
                console.log('Data de expiração ou ID não encontrada no token');
                // enviada uma mensagem e o status de autenticação (falso)
                return res.status(401).json({ message: "Token inválido, faça o login", auth: false }).end();
            }
            // verifica se o tempo de validade do token foi expirado
            const currentTime = Math.floor(Date.now() / 1000);
            // valida se o horário atual for maior que o tempo de expiração registrado no token
            if (currentTime > exp) {
                console.log('Token expirado');
                // enviada uma mensagem e o status de autenticação (falso)
                return res.status(401).json({ message: "Token expirado, faça o login novamente", auth: false }).end();
            }
            req.body.userId = id;
            next();
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map