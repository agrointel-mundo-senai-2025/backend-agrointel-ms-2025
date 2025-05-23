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
exports.CulturaController = void 0;
const Cultura_1 = require("../model/Cultura");
class CulturaController {
    static todos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listaDeCulturas = yield Cultura_1.Cultura.listarCulturas();
                return res.status(200).json(listaDeCulturas);
            }
            catch (error) {
                console.error(`Erro ao acessar listagem de culturas: ${error}`);
                return res.status(500).json({ mensagem: "Não foi possível acessar a listagem de culturas. Entre em contato com o administrador do sistema." });
            }
        });
    }
    static cultura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exigenciasCultura = yield Cultura_1.Cultura.listarCultura(req.query.cultura);
                if (exigenciasCultura == null) {
                    return res.status(400).json('Cultura inexistente na base de dados.');
                }
                else {
                    return res.status(200).json(exigenciasCultura);
                }
            }
            catch (error) {
                console.error(`Erro ao acessar listagem de culturas: ${error}`);
                return res.status(500).json({ mensagem: "Não foi possível acessar a listagem de culturas. Entre em contato com o administrador do sistema." });
            }
        });
    }
}
exports.CulturaController = CulturaController;
//# sourceMappingURL=CulturaController.js.map