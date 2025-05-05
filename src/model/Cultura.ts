import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

export class Cultura {
    private idCultura: number;
    private planta: string;
    private tipoSolo: string;
    private phIdeialMinimo: number;
    private phIdealMaximo: number;
    private nutrientesPrincipais: string[];
    private retencaoAgua: string;
    private climaPreferido: string;
    private temperaturaIdealMinima: number;
    private temperaturaIdealMaxima: number;
    private radiacaoSolar: string;
    private umidadeNecessaria: string;

    constructor(
        idCultura: number,
        planta: string,
        tipoSolo: string,
        phIdeialMinimo: number,
        phIdealMaximo: number,
        nutrientesPrincipais: string[],
        retencaoAgua: string,
        climaPreferido: string,
        temperaturaIdealMinima: number,
        temperaturaIdealMaxima: number,
        radiacaoSolar: string,
        umidadeNecessaria: string
    ) {
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
    public getIdCultura(): number {
        return this.idCultura;
    }
    public setIdCultura(value: number): void {
        this.idCultura = value;
    }

    public getPlanta(): string {
        return this.planta;
    }
    public setPlanta(value: string): void {
        this.planta = value;
    }

    public getTipoSolo(): string {
        return this.tipoSolo;
    }
    public setTipoSolo(value: string): void {
        this.tipoSolo = value;
    }

    public getPhIdeialMinimo(): number {
        return this.phIdeialMinimo;
    }
    public setPhIdeialMinimo(value: number): void {
        this.phIdeialMinimo = value;
    }

    public getPhIdealMaximo(): number {
        return this.phIdealMaximo;
    }
    public setPhIdealMaximo(value: number): void {
        this.phIdealMaximo = value;
    }

    public getNutrientesPrincipais(): string[] {
        return this.nutrientesPrincipais;
    }
    public setNutrientesPrincipais(value: string[]): void {
        this.nutrientesPrincipais = value;
    }

    public getRetencaoAgua(): string {
        return this.retencaoAgua;
    }
    public setRetencaoAgua(value: string): void {
        this.retencaoAgua = value;
    }

    public getClimaPreferido(): string {
        return this.climaPreferido;
    }
    public setClimaPreferido(value: string): void {
        this.climaPreferido = value;
    }

    public getTemperaturaIdealMinima(): number {
        return this.temperaturaIdealMinima;
    }
    public setTemperaturaIdealMinima(value: number): void {
        this.temperaturaIdealMinima = value;
    }

    public getTemperaturaIdealMaxima(): number {
        return this.temperaturaIdealMaxima;
    }
    public setTemperaturaIdealMaxima(value: number): void {
        this.temperaturaIdealMaxima = value;
    }

    public getRadiacaoSolar(): string {
        return this.radiacaoSolar;
    }
    public setRadiacaoSolar(value: string): void {
        this.radiacaoSolar = value;
    }

    public getUmidadeNecessaria(): string {
        return this.umidadeNecessaria;
    }
    public setUmidadeNecessaria(value: string): void {
        this.umidadeNecessaria = value;
    }

    static async listarCulturas(): Promise<Cultura[] | null> {
        const listaDeCulturas: Array<Cultura> = [];
        try {
            const querySelectCultura = `SELECT * FROM exigencias_culturas;`;
            const respostaBD = await database.query(querySelectCultura);

            respostaBD.rows.forEach((linha: any) => {
                const novaCultura = new Cultura(
                    linha.id,
                    linha.planta,
                    linha.tipo_solo,
                    linha.ph_ideal_min,
                    linha.ph_ideal_max,
                    linha.nutrientes_principais,
                    linha.retencao_agua,
                    linha.clima_preferido,
                    linha.temperatura_ideal_min,
                    linha.temperatura_ideal_max,
                    linha.radiacao_solar,
                    linha.umidade_necessaria
                );

                listaDeCulturas.push(novaCultura);
            })

            return listaDeCulturas;
        } catch (error) {
            console.error(`Erro ao realizar consulta: ${error}`);
            return null;
        }
    }
}
