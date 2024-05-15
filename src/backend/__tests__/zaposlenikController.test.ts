import { Zaposlenik } from "../models/zaposlenik";
import { ZaposlenikController } from "../controllers/zaposlenikController";

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveZaposlenike: jest.fn().mockResolvedValue([{ mbr: '1', ime: "Zaposlenik 1" }, { mbr: '2', ime: "Zaposlenik 2" }]),
        dohvatiZaposlenika: jest.fn(),
        dohvatiZaposlenikaPoEmailu: jest.fn(),
        dohvatiZaposlenikaPoOibu: jest.fn(),
        dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([{ mbr: '1', ime: "Zaposlenik 1" }, { mbr: '2', ime: "Zaposlenik 2" }]),
        provjeriReferentaNabave: jest.fn(),
    },
}));

describe('Zaposlenik controller tests', () => {
    it('apiDohvatiZaposlenika', async () => {
        Zaposlenik.dohvatiZaposlenika = jest.fn().mockResolvedValueOnce({ mbr: '1', ime: "Zaposlenik 1" });
        let req = { params: { mbr: '1' } };
        const res = { json: jest.fn() };
        await ZaposlenikController.apiDohvatiZaposlenika(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ mbr: '1', ime: "Zaposlenik 1" });
    });

    it('apiDohvatiSveZaposlenike', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await ZaposlenikController.apiDohvatiSveZaposlenike(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { mbr: '1', ime: "Zaposlenik 1" },
            { mbr: '2', ime: "Zaposlenik 2" },
        ]);
    });

    it('apiDohvatiSveReferenteNabave', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await ZaposlenikController.apiDohvatiSveReferenteNabave(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { mbr: '1', ime: "Zaposlenik 1" },
            { mbr: '2', ime: "Zaposlenik 2" },
        ]);
    });

    it('apiDohvatiSveIdReferentataNabave', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await ZaposlenikController.apiDohvatiSveIdReferentataNabave(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(['1', '2']);
    });

});
