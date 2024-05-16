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

