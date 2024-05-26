import { Artikal } from "../../models/artikal";
import { ArtikalController } from "../../controllers/artikalController";

jest.mock("../../models/artikal", () => {
    return {
        Artikal: {
            dohvatiSveArtikle: jest.fn().mockResolvedValue([
                {
                    idartikla: 1,
                    naziv: "Artikal 1",
                    opis: "Opis artikla 1",
                    dostupnakolicina: 10,
                    cijena: 100,
                    pdv: 25,
                    izdavac: "Izdavac 1",
                    izdanje: "Izdanje 1",
                },
            ]),
            dohvatiArtikal: jest.fn(async (id: number) => {
                return {
                    idartikla: 1,
                    naziv: "Artikal 1",
                    opis: "Opis artikla 1",
                    dostupnakolicina: 10,
                    cijena: 100,
                    pdv: 25,
                    izdavac: "Izdavac 1",
                    izdanje: "Izdanje 1",
                };
            }),
        },
    };
});

describe("Artikal controller integration tests", () => {
    it("apiDohvatiSveArtikle", async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiSveArtikle(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(artikli);
    });

    it("apiDohvatiArtikal", async () => {
        let artikal = await Artikal.dohvatiArtikal(1);
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiArtikal(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(artikal);
    });
});
