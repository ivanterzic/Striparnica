import { Narudzba } from "../../models/narudzba";
import { NarudzbaController } from "../../controllers/narudzbaController";
import { PrismaClient } from '@prisma/client';
import { Zaposlenik } from "../../models/zaposlenik";
import { afterEach, beforeEach } from "node:test";

const prisma = new PrismaClient();

describe('Narudzba controller integration tests', () => {
    
/*
import {Narudzba} from '../models/narudzba';
import {Dobavljac} from '../models/dobavljac';
import { Artikal } from '../models/artikal';
import { Zaposlenik } from '../models/zaposlenik';

describe('Narudzba model tests', () => {

    jest.mock("../models/narudzba", () => ({
        Narudzba: {
            dohvatiSveNarudzbe: jest.fn().mockResolvedValue([{ idnarudzbe: 1, status: "potvrdena" }, { idnarudzbe: 2, status: "u tijeku" }]),
            dohvatiNarudzbu: jest.fn(),
            dohvatiPrviManjiID: jest.fn(),
            dohvatiPrviVeciID: jest.fn(),
            dohvatiSveStatuseNarudzbi: jest.fn().mockResolvedValue(["potvrdena", "u tijeku"]),
            kreirajNarudzbu: jest.fn(),
            azurirajNarudzbu: jest.fn(),
            obrisiNarudzbu: jest.fn(),
            urediArtikleNarudzbe: jest.fn(),
        },
    }));
    

    test('provjeriObaveznaPolja', () => {
        // Datum, status, mbrreferenta i iddobavljaca su obavezna polja
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), 'potvrdena', '12345678901', 1)).not.toThrow();
        expect(() => Narudzba.provjeriObaveznaPolja(undefined, 'potvrdena', '12345678901', 1)).toThrow();
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), undefined, '12345678901', 1)).toThrow();
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), 'potvrdena', undefined, 1)).toThrow();
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), 'potvrdena', '12345678901', undefined)).toThrow();
    }
    );
    test('provjeriDatumStvaranja', () => {
        // Datum u proslosti - ispravan
        expect(() => Narudzba.provjeriDatumStvaranja(new Date())).not.toThrow();
        // Datum u buducnosti - neispravan
        expect(() => Narudzba.provjeriDatumStvaranja(new Date('2028-12-12'))).toThrow();
    });
    test('provjeriDatumZaprimanja', () => {
        // Datum u buducnosti - ispravan
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date(), new Date())).not.toThrow();
        // Datum zaprimanja prije datuma stvaranja - neispravan
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date(), new Date('2028-12-12'))).toThrow();
        // Datum zaprimanja prije trenutnog datuma - neispravan
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date('2022-12-12'), new Date())).toThrow();
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date('2021-12-12'), new Date('2022-12-12'))).toThrow();
    });
    test('provjeriIdNarudzbe', async () => {
        let narudzba = await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[];
        if (narudzba.length > 0) {
            expect(() => Narudzba.provjeriIdNarudzbe(narudzba[0].idnarudzbe)).not.toThrow();
        }
        expect(() => Narudzba.provjeriIdNarudzbe(0)).toThrow
        expect(() => Narudzba.provjeriIdNarudzbe(undefined)).toThrow
        expect(() => Narudzba.provjeriIdNarudzbe(-1)).toThrow
        expect(() => Narudzba.provjeriIdNarudzbe(1.5)).toThrow
        expect(() => Narudzba.provjeriIdNarudzbe(1000000)).toThrow
    });
    test('provjeriStatus', () => {
        expect(() => Narudzba.provjeriStatus('potvrdena')).not.toThrow();
        expect(() => Narudzba.provjeriStatus('neki status')).toThrow();
    });
    test('provjeriStavkeNarudzbe', () => {
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }])).not.toThrow();
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 2 }])).not.toThrow();
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 0 }])).toThrow
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: -1 }])).toThrow
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 1.5 }])).toThrow
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 1 }, { idartikla: 3, kolicina: 1 }])).toThrow
    });
    test('provjeriDobavljaca', async () => {
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace() as { iddobavljaca: number }[];
        if (dobavljaci.length > 0) {
            expect(() => Narudzba.provjeriDobavljaca(dobavljaci[0].iddobavljaca)).not.toThrow();
        }
        expect(() => Narudzba.provjeriDobavljaca(0)).toThrow
        expect(() => Narudzba.provjeriDobavljaca(-1)).toThrow
    });
    test('dohvatiSveStatuseNarudzbi', async () => {
        expect(await Narudzba.dohvatiSveStatuseNarudzbi()).toEqual(["potvrdena", "u tijeku", "nepotpuna"]);
    });
    test('dohvatiPrviVeciID', async () => {
        let idnarudzbe
        let narudzba = await Narudzba.dohvatiSveNarudzbe()
        idnarudzbe = narudzba[0].idnarudzbe
        expect(await Narudzba.dohvatiPrviVeciID(idnarudzbe)).toBeGreaterThan(idnarudzbe);

    });
    test('dohvatiPrviManjiID', async () => {
        let idnarudzbe
        let narudzba = await Narudzba.dohvatiSveNarudzbe()
        idnarudzbe = narudzba[1].idnarudzbe
        expect(await Narudzba.dohvatiPrviManjiID(idnarudzbe)).toBeLessThan(idnarudzbe);
    }
    );

    test('kreirajNarudzbu', async () => {
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = 'potvrdena';
        let dob = await Dobavljac.dohvatiSveDobavljace()
        let iddobavljaca = dob[0].iddobavljaca;
        let ref = await Zaposlenik.dohvatiSveReferenteNabave()
        let mbrreferenta = ref[0].mbr;
        expect(await Narudzba.kreirajNarudzbu(datumstvaranja, datumzaprimanja, status, iddobavljaca, mbrreferenta)).toEqual({
            idnarudzbe: expect.any(Number),
            datumstvaranja: expect.any(String),
            datumzaprimanja: expect.any(String),
            status: status,
            iddobavljaca: iddobavljaca,
            mbrreferenta: mbrreferenta
        });
        expect(() => Narudzba.kreirajNarudzbu(undefined, datumzaprimanja, status, iddobavljaca, mbrreferenta)).toThrow
        expect(() => Narudzba.kreirajNarudzbu(datumstvaranja, null, status, iddobavljaca, mbrreferenta)).toThrow
        expect(() => Narudzba.kreirajNarudzbu(datumstvaranja, datumzaprimanja, undefined, iddobavljaca, mbrreferenta)).toThrow
        expect(() => Narudzba.kreirajNarudzbu(datumstvaranja, datumzaprimanja, status, undefined, mbrreferenta)).toThrow
        expect(() => Narudzba.kreirajNarudzbu(datumstvaranja, datumzaprimanja, status, iddobavljaca, undefined)).toThrow    
    });
    test('dohvatiSveNarudzbe', async () => {
        expect(await Narudzba.dohvatiSveNarudzbe()).toEqual(expect.any(Array));
    });
    test('dohvatiNarudzbu', async () => {
        let narudzba = await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[];
        if (narudzba.length > 0) {
            expect(await Narudzba.dohvatiNarudzbu(narudzba[0].idnarudzbe)).toEqual(expect.any(Object));
        }
    });
    test('azurirajNarudzbu', async () => {
        let datumstvaranja = new Date();
        let datumzaprimanja = new Date();
        let status = 'potvrdena';
        let dob = await Dobavljac.dohvatiSveDobavljace()
        let iddobavljaca = dob[0].iddobavljaca;
        let ref = await Zaposlenik.dohvatiSveReferenteNabave()
        let mbrreferenta = ref[0].mbr;
        let narudzba = await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[];
        if (narudzba.length > 0) {
            expect(await Narudzba.azurirajNarudzbu(narudzba[0].idnarudzbe, datumstvaranja, datumzaprimanja, status, iddobavljaca, mbrreferenta)).toEqual({
                idnarudzbe: narudzba[0].idnarudzbe,
                datumstvaranja: expect.any(String),
                datumzaprimanja: expect.any(String),
                status: status,
                iddobavljaca: iddobavljaca,
                mbrreferenta: mbrreferenta
            });
        }
    });
    test('obrisiNarudzbu', async () => {
        let narudzba = await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[];
        if (narudzba.length > 0) {
            expect(await Narudzba.obrisiNarudzbu(narudzba[0].idnarudzbe)).toEqual(expect.any(Object));
        }
    });
    test('urediArtikleNarudzbe', async () => {
        let artikli = await Artikal.dohvatiSveArtikle() as { idartikla: number }[];
        let narudzba = await Narudzba.dohvatiSveNarudzbe() as { idnarudzbe: number }[];
        if (narudzba.length > 0 && artikli.length > 0) {
            expect(await Narudzba.urediArtikleNarudzbe(narudzba[0].idnarudzbe, [{ idartikla: artikli[0].idartikla, kolicina: 1 }])).toEqual(expect.any(Object));
        }
    });
});

*/
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
        //reset mock implementation after each test
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




