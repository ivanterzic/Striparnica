import { Artikal } from "../models/artikal";

jest.mock("../models/artikal", () => ({
    Artikal: {
        dohvatiSveArtikle: jest.fn().mockResolvedValue([
            { idartikla: 1, name: "Artikal 1" },
            { idartikla: 2, name: "Artikal 2" },
        ]),
        dohvatiArtikal: jest.fn(),
    },
}));

describe('Artikal model tests', () => {
    test('dohvati sve artikle', async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        expect(artikli).toEqual([
            { idartikla: 1, name: "Artikal 1" },
            { idartikla: 2, name: "Artikal 2" },
        ]);
    });

    test('dohvati artikal', async () => {
        Artikal.dohvatiArtikal = jest.fn().mockResolvedValueOnce({ idartikla: 1, name: "Artikal 1" });
        let artikal = await Artikal.dohvatiArtikal(1);
        expect(artikal).toEqual({ idartikla: 1, name: "Artikal 1" });
        let nonExistingArtikalId = 81236;
        artikal = await Artikal.dohvatiArtikal(nonExistingArtikalId);
        expect(artikal).toBeUndefined
    });
});
