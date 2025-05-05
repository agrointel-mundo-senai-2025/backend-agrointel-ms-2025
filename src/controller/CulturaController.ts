import { Cultura } from "../model/Cultura";
import { Request, Response } from "express";

export class CulturaController {
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            const listaDeCulturas = await Cultura.listarCulturas();

            return res.status(200).json(listaDeCulturas);
        } catch (error) {
            console.error(`Erro ao acessar listagem de culturas: ${error}`);
            return res.status(500).json({ mensagem: "Não foi possível acessar a listagem de culturas. Entre em contato com o administrador do sistema." });
        }
    }
}
