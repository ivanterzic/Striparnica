import { Narudzba } from "../../models/narudzba";
import { NarudzbaController } from "../../controllers/narudzbaController";
import { PrismaClient } from '@prisma/client';
import { Zaposlenik } from "../../models/zaposlenik";
import { afterEach, beforeEach } from "node:test";

const prisma = new PrismaClient();

describe('Narudzba controller integration tests', () => {
    
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
                kreirajNarudzbu: jest.fn(),
                azurirajNarudzbu: jest.fn(),
                obrisiNarudzbu: jest.fn(),
                urediArtikleNarudzbe: jest.fn(),
                provjeriObaveznaPolja: jest.fn(),
                provjeriDatumStvaranja: jest.fn(),
                provjeriDatumZaprimanja: jest.fn(),
                provjeriIdNarudzbe: jest.fn(),
                provjeriStatus: jest.fn(),
                provjeriStavkeNarudzbe: jest.fn(),
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
                ])
            }
        }
    }
    );

    afterEach(async () => {
        jest.clearAllMocks();
    });


    it('apiDohvatiSveNarudzbe', async () => {
        let narudzbe = await Narudzba.dohvatiSveNarudzbe();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveNarudzbe(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(narudzbe);
    });

    it('apiDohvatiNarudzbu', async () => {
        let o = await Narudzba.dohvatiSveNarudzbe();
        let id = o[0].idnarudzbe;
        let result = await Narudzba.dohvatiNarudzbu(id);
        let previousId = await Narudzba.dohvatiPrviManjiID(id);
        let nextId = await Narudzba.dohvatiPrviVeciID(id);
        const req = { params: { id: id } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiNarudzbu(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith({
            ...result,
            previousId: previousId,
            nextId: nextId,
        });
    });

    it('apiDohvatiSveStatuseNarudzbi', async () => {
        let statusi = await Narudzba.dohvatiSveStatuseNarudzbi();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiDohvatiSveStatuseNarudzbi(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(statusi);
    });

    it('apiKreirajNarudzbu', async () => {
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = "potvrdena";
        let iddobavljaca = 1;
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        let mbrreferenta =  referenti[0].mbr;
        let req = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(200);

        let req2 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: "0" } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
        let req3 = { body: { datumstvaranja: undefined, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: 982374, mbrreferenta: mbrreferenta } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);

        let req5 = { body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: "neki status nevaljani", iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res5 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiKreirajNarudzbu(req5 as any, res5 as any);
        expect(res5.status).toHaveBeenCalledWith(400);

    });

    it('apiAzurirajNarudzbu', async () => {
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = "potvrdena";
        let iddobavljaca = 1;
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        let mbrreferenta = referenti[0].mbr;
        let narudzba = await Narudzba.dohvatiSveNarudzbe();
        let id = narudzba[0].idnarudzbe;

        let req2 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: "0" } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
        let req3 = { params: { id: id }, body: { datumstvaranja: undefined, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: status, iddobavljaca: 982374, mbrreferenta: mbrreferenta } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiAzurirajNarudzbu(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);

            
        let req5 = { params: { id: id }, body: { datumstvaranja: datumstvaranja, datumzaprimanja: datumzaprimanja, status: "neki status nevaljani", iddobavljaca: iddobavljaca, mbrreferenta: mbrreferenta } };
        let res5 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };   
        await NarudzbaController.apiAzurirajNarudzbu(req5 as any, res5 as any);
        expect(res5.status).toHaveBeenCalledWith(400);

    });

   

    it('apiObrisiNarudzbu', async () => {
       
        let req2 = { params: { id: 0 } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiObrisiNarudzbu(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(400);
        
    });

    it('apiUrediArtikleNarudzbe', async () => {
        let artikli = await Narudzba.dohvatiSveNarudzbe();
        let id = artikli[0].idnarudzbe;
        
        let req2 = { params: { id: id }, body: { stavkenarudzbe: [] } };
        let res2 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req2 as any, res2 as any);
        expect(res2.status).toHaveBeenCalledWith(200 || 400);

        let req3 = { params: { id: id }, body: { stavkenaruzbe: [{ idartikla: 0, kolicina: 1 }] } };
        let res3 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req3 as any, res3 as any);
        expect(res3.status).toHaveBeenCalledWith(400);

        let req4 = { params: { id: id }, body: { stavkenarudzbe: [{ idartikla: 1, kolicina: 0 }] } };
        let res4 = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await NarudzbaController.apiUrediArtikleNarudzbe(req4 as any, res4 as any);
        expect(res4.status).toHaveBeenCalledWith(400);


    });
});




