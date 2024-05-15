import {Artikal} from '../models/artikal';
import { ArtikalController } from '../controllers/artikalController';

jest.mock("../models/artikal", () => ({
    Artikal: {
        dohvatiSveArtikle: jest.fn().mockResolvedValue([
            { idartikla: 1, name: "Artikal 1" },
            { idartikla: 2, name: "Artikal 2" },
        ]),
        dohvatiArtikal: jest.fn(),
    },
}));

//
describe('Artikal controller tests', () => {
    it('apiDohvatiArtikal', async () => {
        Artikal.dohvatiArtikal = jest.fn().mockResolvedValueOnce({ idartikla: 1, name: "Artikal 1" });
        const req = { params: { id: 1 } };
        const res = { json: jest.fn() };
        await ArtikalController.apiDohvatiArtikal(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idartikla: 1, name: "Artikal 1" });
    }
    );
    it('apiDohvatiSveArtikle', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await ArtikalController.apiDohvatiSveArtikle(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { idartikla: 1, name: "Artikal 1" },
            { idartikla: 2, name: "Artikal 2" },
        ]);
    });

});

