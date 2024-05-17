import { NarudzbaController } from "../../controllers/narudzbaController";
import { Narudzba } from "../../models/narudzba";

jest.mock('../../models/narudzba', () => {
    return {
        Narudzba: {
            dohvatiSveNarudzbe: jest.fn().mockResolvedValue([
                {
                    idnarudzbe: 1,
                    status: "potvrdena"
                },
                {
                    idnarudzbe: 2,
                    status: "u tijeku"
                }
            ]),
            dohvatiNarudzbu: jest.fn(),
            dohvatiPrviManjiID: jest.fn(),
            dohvatiPrviVeciID: jest.fn(),
            dohvatiSveStatuseNarudzbi: jest.fn().mockResolvedValue(["potvrdena", "u tijeku"]),
            kreirajNarudzbu: jest.fn( async () => { return { idnarudzbe: 1 }; }),
            azurirajNarudzbu: jest.fn( async () => { return { idnarudzbe: 1 }; }),
            obrisiNarudzbu: jest.fn( async () => { return { idnarudzbe: 1 }; }),
            urediArtikleNarudzbe: jest.fn(),
            provjeriIdNarudzbe: jest.fn(),
            provjeriDobavljaca: jest.fn(),
        }
    }
});

jest.mock('../../models/zaposlenik', () => {
    return {
        Zaposlenik: {
            dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([
                {
                    mbr: '1234567890123',
                    ime: "Zaposlenik 1"
                }
            ])
        }
    }
}
);
 
jest.mock('../../models/dobavljac', () => {
    return {
        Dobavljac: {
            dohvatiSveDobavljace: jest.fn().mockResolvedValue([
                {
                    iddobavljaca: 1,
                    ime: "Dobavljac 1"
                }
            ]),
            dohvatiDobavljaca: jest.fn()

        }
    }
}
);

afterEach(() => {
    jest.clearAllMocks();
});

describe('Narudzba controller integration tests', () => {
   
    it('apiDohvatiSveNarudzbe', async () => {
        let narudzbe = await Narudzba.dohvatiSveNarudzbe();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(narudzbe);
    });

    it('apiDohvatiNarudzbu', async () => {
        let narudzba = await Narudzba.dohvatiNarudzbu(1);
        let previousId = await Narudzba.dohvatiPrviManjiID(1);
        let nextId = await Narudzba.dohvatiPrviVeciID(1);
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ ...narudzba, previousId: previousId, nextId: nextId });
        
        let narudzba2 = await Narudzba.dohvatiNarudzbu(2);
        let previousId2 = await Narudzba.dohvatiPrviManjiID(2);
        let nextId2 = await Narudzba.dohvatiPrviVeciID(2);
        const req2 = { params: { id: 2 } };
        const res2 = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiNarudzbu(req2 as any, res2 as any);
        expect(res2.json).toHaveBeenCalledWith({ ...narudzba2, previousId: previousId2, nextId: nextId2 });
    });

    it('apiDohvatiSveStatuseNarudzbi', async () => {
        let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveStatuseNarudzbi(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(statusi);
    });

    it('apiKreirajNarudzbu', async () => {
        const req = {
            body: {
                datumstvaranja: new Date(),
                datumzaprimanja: new Date(),
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1234567890123"
            }
        };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idnarudzbe: 1 });

        const req2 = {
            body: {
                datumstvaranja: new Date(),
                datumzaprimanja: new Date(),
                status: "potvrdena",
                mbrreferenta: "1234567890123"
            }
        };
        const res2 = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req2 as any, res2 as any);
        expect(res2.json).toHaveBeenCalledWith({ idnarudzbe: 1 });
    });

    it('apiAzurirajNarudzbu', async () => {
        const req = {
            params: { id: 1 },
            body: {
                datumstvaranja: new Date(),
                datumzaprimanja: new Date(),
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1234567890123"
            }
        };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idnarudzbe: 1 });
    });


    it('apiUrediArtikleNarudzbe', async () => {
        (Narudzba.urediArtikleNarudzbe as jest.Mock).mockResolvedValue({ idnarudzbe: 1 } as any);
        const req = {
            params: { id: 1 },
            body: {
                stavkenarudzbe: [
                    {
                        idartikla: 1,
                        kolicina: 1
                    }
                ]
            }
        };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idnarudzbe: 1 });
    });

    it('apiObrisiNarudzbu', async () => {
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiObrisiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({ idnarudzbe: 1 });
    });
});




