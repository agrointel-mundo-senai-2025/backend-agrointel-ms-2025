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
exports.Cultura = void 0;
const DatabaseModel_1 = require("./DatabaseModel");
const database = new DatabaseModel_1.DatabaseModel().pool;
class Cultura {
    constructor(idCultura, planta, tipoSolo, phIdeialMinimo, phIdealMaximo, nutrientesPrincipais, retencaoAgua, climaPreferido, temperaturaIdealMinima, temperaturaIdealMaxima, radiacaoSolar, umidadeNecessaria) {
        this.idCultura = idCultura;
        this.planta = planta;
        this.tipoSolo = tipoSolo;
        this.phIdeialMinimo = phIdeialMinimo;
        this.phIdealMaximo = phIdealMaximo;
        this.nutrientesPrincipais = nutrientesPrincipais;
        this.retencaoAgua = retencaoAgua;
        this.climaPreferido = climaPreferido;
        this.temperaturaIdealMinima = temperaturaIdealMinima;
        this.temperaturaIdealMaxima = temperaturaIdealMaxima;
        this.radiacaoSolar = radiacaoSolar;
        this.umidadeNecessaria = umidadeNecessaria;
    }
    // Getters e Setters
    getIdCultura() {
        return this.idCultura;
    }
    setIdCultura(value) {
        this.idCultura = value;
    }
    getPlanta() {
        return this.planta;
    }
    setPlanta(value) {
        this.planta = value;
    }
    getTipoSolo() {
        return this.tipoSolo;
    }
    setTipoSolo(value) {
        this.tipoSolo = value;
    }
    getPhIdeialMinimo() {
        return this.phIdeialMinimo;
    }
    setPhIdeialMinimo(value) {
        this.phIdeialMinimo = value;
    }
    getPhIdealMaximo() {
        return this.phIdealMaximo;
    }
    setPhIdealMaximo(value) {
        this.phIdealMaximo = value;
    }
    getNutrientesPrincipais() {
        return this.nutrientesPrincipais;
    }
    setNutrientesPrincipais(value) {
        this.nutrientesPrincipais = value;
    }
    getRetencaoAgua() {
        return this.retencaoAgua;
    }
    setRetencaoAgua(value) {
        this.retencaoAgua = value;
    }
    getClimaPreferido() {
        return this.climaPreferido;
    }
    setClimaPreferido(value) {
        this.climaPreferido = value;
    }
    getTemperaturaIdealMinima() {
        return this.temperaturaIdealMinima;
    }
    setTemperaturaIdealMinima(value) {
        this.temperaturaIdealMinima = value;
    }
    getTemperaturaIdealMaxima() {
        return this.temperaturaIdealMaxima;
    }
    setTemperaturaIdealMaxima(value) {
        this.temperaturaIdealMaxima = value;
    }
    getRadiacaoSolar() {
        return this.radiacaoSolar;
    }
    setRadiacaoSolar(value) {
        this.radiacaoSolar = value;
    }
    getUmidadeNecessaria() {
        return this.umidadeNecessaria;
    }
    setUmidadeNecessaria(value) {
        this.umidadeNecessaria = value;
    }
    static listarCulturas() {
        return __awaiter(this, void 0, void 0, function* () {
            const listaDeCulturas = [];
            try {
                const querySelectCultura = `SELECT * FROM exigencias_culturas;`;
                const respostaBD = yield database.query(querySelectCultura);
                respostaBD.rows.forEach((linha) => {
                    const novaCultura = new Cultura(linha.id, linha.planta, linha.tipo_solo, linha.ph_ideal_min, linha.ph_ideal_max, linha.nutrientes_principais, linha.retencao_agua, linha.clima_preferido, linha.temperatura_ideal_min, linha.temperatura_ideal_max, linha.radiacao_solar, linha.umidade_necessaria);
                    listaDeCulturas.push(novaCultura);
                });
                return listaDeCulturas;
            }
            catch (error) {
                console.error(`Erro ao realizar consulta: ${error}`);
                return null;
            }
        });
    }
    static listarCultura(cultura) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const querySelectCultura = `SELECT * FROM exigencias_culturas WHERE planta='${cultura.toUpperCase()}';`;
                const respostaBD = yield database.query(querySelectCultura);
                if (respostaBD.rows.length > 0) {
                    const linha = respostaBD.rows[0];
                    return new Cultura(linha.id, linha.planta, linha.tipo_solo, linha.ph_ideal_min, linha.ph_ideal_max, linha.nutrientes_principais, linha.retencao_agua, linha.clima_preferido, linha.temperatura_ideal_min, linha.temperatura_ideal_max, linha.radiacao_solar, linha.umidade_necessaria);
                }
                return null;
            }
            catch (error) {
                console.error(`Erro ao realizar consulta: ${error}`);
                return null;
            }
        });
    }
}
exports.Cultura = Cultura;
//# sourceMappingURL=Cultura.js.map