import { Dobavljac } from "../models/dobavljac";
import { DobavljacController } from "../controllers/dobavljacController";

jest.mock("../models/dobavljac", () => ({
    Dobavljac: {
        dohvatiSveDobavljace: jest.fn().mockResolvedValue([{ iddobavljaca: 1, name: "Dobavljac 1" }, { iddobavljaca: 2, name: "Dobavljac 2" }]), //ovdje se mijenja
        dohvatiDobavljaca: jest.fn(),
    },
}));


describe('Dobavljac controller tests', () => {

    it('apiDohvatiDobavljaca', async () => {
        Dobavljac.dohvatiDobavljaca = jest.fn().mockResolvedValueOnce({ iddobavljaca: 1, name: "Dobavljac 1" });
        let req = { params: { id: 1 } };
        const res = { json: jest.fn() };
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ iddobavljaca: 1, name: "Dobavljac 1" });
    });

    it('apiDohvatiSveDobavljace', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await DobavljacController.apiDohvatiSveDobavljace(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { iddobavljaca: 1, name: "Dobavljac 1" },
            { iddobavljaca: 2, name: "Dobavljac 2" },
        ]);
    }
    
    );
    it('apiDohvatiSveId', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await DobavljacController.apiDohvatiSveId(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([1, 2]);
    });


});


