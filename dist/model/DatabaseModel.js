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
exports.DatabaseModel = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Classe que representa o modelo de banco de dados.
 */
class DatabaseModel {
    /**
     * Construtor da classe DatabaseModel.
     */
    constructor() {
        // Configuração padrão para conexão com o banco de dados
        this._config = {
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            max: 10,
            idleTimoutMillis: 10000
        };
        // Inicialização do pool de conexões
        this._pool = new pg_1.default.Pool(this._config);
        // Inicialização do cliente de conexão
        this._client = new pg_1.default.Client(this._config);
    }
    /**
     * Método para testar a conexão com o banco de dados.
     *
     * @returns **true** caso a conexão tenha sido feita, **false** caso negativo
     */
    testeConexao() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Tenta conectar ao banco de dados
                yield this._client.connect();
                console.log('Database connected!');
                // Encerra a conexão
                this._client.end();
                return true;
            }
            catch (error) {
                // Em caso de erro, exibe uma mensagem de erro
                console.log('Error to connect database X( ');
                console.log(error);
                // Encerra a conexão
                this._client.end();
                return false;
            }
        });
    }
    /**
     * Getter para o pool de conexões.
     */
    get pool() {
        return this._pool;
    }
}
exports.DatabaseModel = DatabaseModel;
//# sourceMappingURL=DatabaseModel.js.map