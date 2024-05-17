import { Narudzba } from "../models/narudzba";
import { NarudzbaController } from "../controllers/narudzbaController";

jest.mock("../models/narudzba", () => ({
    Narudzba: {
        dohvatiSveNarudzbe: jest.fn().mockResolvedValue([{ idnarudzbe: 1, status: "potvrdena" }, { idnarudzbe: 2, status: "u tijeku" }],
        ),
        dohvatiNarudzbu: jest.fn( async () => { return { idnarudzbe: 1, status: "Kreirana" }; }),
        dohvatiPrviManjiID: jest.fn(),
        dohvatiPrviVeciID: jest.fn(),
        dohvatiSveStatuseNarudzbi: jest.fn().mockResolvedValue(["potvrdena", "u tijeku"]),
        kreirajNarudzbu: jest.fn( async () => { return { idnarudzbe: 1 }; }),
        azurirajNarudzbu: jest.fn(),
        obrisiNarudzbu: jest.fn(),
        urediArtikleNarudzbe: jest.fn(),
    },
}));

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([{ mbr: '1', ime: "Zaposlenik 1" }, { mbr: '2', ime: "Zaposlenik 2" }]),
    },
}));

jest.mock("../models/dobavljac", () => ({
    Dobavljac: {
        dohvatiSveDobavljace: jest.fn().mockResolvedValue([{ iddobavljaca: 1, ime: "Dobavljac 1" }, { iddobavljaca: 2, ime: "Dobavljac 2" }]),
    },
}));

describe('Narudzba controller tests', () => {
    it('apiDohvatiSveNarudzbe', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiSveNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith([
            { idnarudzbe: 1, status: "potvrdena" },
            { idnarudzbe: 2, status: "u tijeku" }
        ]);
    });

    it('apiDohvatiNarudzbu', async () => {
        const req = { params: { id: '1' } };
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idnarudzbe: 1, status: "Kreirana" });
    });

    it('apiDohvatiSveStatuseNarudzbi', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatiSveStatuseNarudzbi(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(["potvrdena", "u tijeku"]);
    });

    it('apiDohvatSvihKljuceva', async () => {
        const req = {};
        const res = { json: jest.fn() };
        await NarudzbaController.apiDohvatSvihKljuceva(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            mbrreferenata: ['1', '2'],
            statusi: ["potvrdena", "u tijeku"],
            dobavljaci: [
                { id: 1, ime: "Dobavljac 1" },
                { id: 2, ime: "Dobavljac 2" },
            ],
            narudzbe: [1, 2],
        });
    }
    );

    it('apiKreirajNarudzbu', async () => {
        (Narudzba.kreirajNarudzbu as jest.Mock).mockResolvedValueOnce({ idnarudzbe: 1 });
        const req = {
            body: {
                datumstvaranja: "2021-01-01",
                datumzaprimanja: "2021-01-02",
                status: "Kreirana",
                iddobavljaca: 1,
                mbrreferenta: '1',
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await NarudzbaController.apiKreirajNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('apiAzurirajNarudzbu', async () => {
        const req = {
            params: { id: '1' },
            body: {
                datumstvaranja: "2021-01-01",
                datumzaprimanja: "2021-01-02",
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: '1',
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await NarudzbaController.apiAzurirajNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('apiObrisiNarudzbu', async () => {
        const req = {
            params: { id: '1' },
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await NarudzbaController.apiObrisiNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('apiUrediArtikleNarudzbe', async () => {
        const req = {
            params: { id: '1' },
            body: {
                stavkenarudzbe: [
                    { idartikla: 1, kolicina: 1 },
                    { idartikla: 2, kolicina: 2 },
                ]
            }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('pretvoriDatume', async () => {
        let result = await NarudzbaController.pretvoriDatume("2021-01-01", "2021-01-02");
        expect(result).toEqual({
            datumstvaranja: new Date("2021-01-01"),
            datumzaprimanja: new Date("2021-01-02"),
        });
    });

    it('provjeriIdDobavljaca', async () => {
        expect(() => NarudzbaController.provjeriIdDobavljaca("1")).not.toThrow();
        expect(() => NarudzbaController.provjeriIdDobavljaca("a")).toThrow();
    });

}
);