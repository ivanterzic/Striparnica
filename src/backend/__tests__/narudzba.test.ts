import {Narudzba} from '../models/narudzba';
import { afterEach } from 'node:test';

jest.mock("../models/narudzba", () => ({
    Narudzba: {
        kreirajNarudzbu: jest.fn( async (datumstvaranja: Date | undefined, datumzaprimanja: Date | null, status: string | undefined, iddobavljaca: number | undefined, mbrreferenta: string | undefined) => {
            if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                throw 'Nedostaju obavezna polja.';
            }
            return {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            };
        }
        ),
        dohvatiSveNarudzbe: jest.fn().mockResolvedValue([
            { idnarudzbe: 1, datumstvaranja: new Date().toJSON().split('T')[0], datumzaprimanja: new Date().toJSON().split('T')[0], status: "potvrdena", iddobavljaca: 1, mbrreferenta: "1" },
            { idnarudzbe: 2, datumstvaranja: new Date().toJSON().split('T')[0], datumzaprimanja: new Date().toJSON().split('T')[0], status: "potvrdena", iddobavljaca: 1, mbrreferenta: "1" }
        ]),
        dohvatiNarudzbu: jest.fn().mockResolvedValue({
            narudzba: {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            },
            artikli: [
                { idartikla: 1, kolicina: 1 },
                { idartikla: 2, kolicina: 1 }
            ]
        }),
        dohvatiSveStatuseNarudzbi: jest.fn().mockResolvedValue(["potvrdena", "u tijeku", "nepotpuna"]),
        dohvatiPrviVeciID: jest.fn().mockResolvedValue(  2),
        dohvatiPrviManjiID: jest.fn().mockResolvedValue(1),
        azurirajNarudzbu: jest.fn( async (id: number | undefined, datumstvaranja: Date | undefined, datumzaprimanja: Date | null | undefined, status: string | undefined, iddobavljaca: number | undefined, mbrreferenta: string | undefined) => {
  
            if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                throw 'Nedostaju obavezna polja.';
            }
            if (id == 0){
                throw 'Id narudžbe ne može biti 0.';
            }
            if (!id || id == undefined) {
                throw 'Nedostaje id narudžbe.';
            }
            if (isNaN(id)) {
                throw 'Id narudžbe mora biti broj.';
            }
            return {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            };

        }
        ),
        obrisiNarudzbu: jest.fn( async (id: number) => {
            return {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            };
        }
        ),
        urediArtikleNarudzbe: jest.fn(
            async (id: number, artikli: Array<{ idartikla: number, kolicina: number }>) => {
                return [
                    { idartikla: 1, kolicina: 1 },
                    { idartikla: 2, kolicina: 1 }
                ];
            }
        ),
        
    },
}));

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([{ mbr: '1', ime: "Zaposlenik 1" }, { mbr: '2', ime: "Zaposlenik 2" }]),
        provjeriReferentaNabave: jest.fn( async (mbr: string) => {
            if (mbr != '1' && mbr != '2') {
                throw 'Matični broj referenta nije među validnim referentima nabave.';
            }
        }
        ),
    },
}));

jest.mock("../models/dobavljac", () => ({
    Dobavljac: {
        dohvatiSveDobavljace: jest.fn().mockResolvedValue([{ iddobavljaca: 1, ime: "Dobavljac 1" }, { iddobavljaca: 2, ime: "Dobavljac 2" }]),
    },
}));

jest.mock("../models/artikal", () => ({
    Artikal: {
        dohvatiSveArtikle: jest.fn().mockResolvedValue([{ idartikla: 1, naziv: "Artikal 1" }, { idartikla: 2, naziv: "Artikal 2" }]),
    },
}));

afterEach(() => {
    jest.clearAllMocks();
}
);

describe('Narudzba model tests', () => {

    it('kreiraj narudzbu', async () => {
        let result = await Narudzba.kreirajNarudzbu(new Date(), new Date(), "potvrdena", 1, "1");
        expect(result).toEqual({
            idnarudzbe: 1,
            datumstvaranja: new Date().toJSON().split('T')[0],
            datumzaprimanja: new Date().toJSON().split('T')[0],
            status: "potvrdena",
            iddobavljaca: 1,
            mbrreferenta: "1"
        });
        expect (async () => {
            await Narudzba.kreirajNarudzbu(undefined, new Date(), "potvrdena", 1, "1");
        }
        ).rejects.toThrow
        expect(async () => {
            await Narudzba.kreirajNarudzbu(new Date(), new Date(), undefined, 1, "1");
        }
        ).rejects.toThrow
        expect(async () => {
            await Narudzba.kreirajNarudzbu(new Date(), new Date(), "potvrdena", undefined, "1");
        }
        ).rejects.toThrow
    }
    );

    it('dohvati sve narudzbe', async () => {
        let result = await Narudzba.dohvatiSveNarudzbe();
        expect(result).toEqual([
            { idnarudzbe: 1, datumstvaranja: new Date().toJSON().split('T')[0], datumzaprimanja: new Date().toJSON().split('T')[0], status: "potvrdena", iddobavljaca: 1, mbrreferenta: "1" },
            { idnarudzbe: 2, datumstvaranja: new Date().toJSON().split('T')[0], datumzaprimanja: new Date().toJSON().split('T')[0], status: "potvrdena", iddobavljaca: 1, mbrreferenta: "1" }
        ]);
    });

    it('dohvati narudzbu', async () => {
        let result = await Narudzba.dohvatiNarudzbu(1);
        expect(result).toEqual({
            narudzba: {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            },
            artikli: [
                { idartikla: 1, kolicina: 1 },
                { idartikla: 2, kolicina: 1 }
            ]
        });
    });

    it('dohvati sve statuse narudzbi', async () => {
        let result = await Narudzba.dohvatiSveStatuseNarudzbi();
        expect(result).toEqual(["potvrdena", "u tijeku", "nepotpuna"]);
    });

    it('dohvati prvi veći ID', async () => {
        let result = await Narudzba.dohvatiPrviVeciID(1);
        expect(result).toEqual(2);
    });

    it('dohvati prvi manji ID', async () => {
        let result = await Narudzba.dohvatiPrviManjiID(2);
        expect(result).toEqual(1);
    });

    it('azuriraj narudzbu', async () => {
        let result = await Narudzba.azurirajNarudzbu(1, new Date(), new Date(), "potvrdena", 1, "1");
        expect(result).toEqual({
            idnarudzbe: 1,
            datumstvaranja: new Date().toJSON().split('T')[0],
            datumzaprimanja: new Date().toJSON().split('T')[0],
            status: "potvrdena",
            iddobavljaca: 1,
            mbrreferenta: "1"
        });
        expect(async () => {
            await Narudzba.azurirajNarudzbu(undefined, new Date(), new Date
            (), "potvrdena", 1, "1");
        }
        ).rejects.toThrow
        expect(async () => {
            await Narudzba.azurirajNarudzbu(1, undefined, new Date(), "potvrdena", 1, "1");
        }
        ).rejects.toThrow
        expect(async () => {
            await Narudzba.azurirajNarudzbu(1, new Date(), new Date(), undefined, 1, "1");
        }
        ).rejects.toThrow
        expect(async () => {
            await Narudzba.azurirajNarudzbu(1, new Date(), new Date(), "potvrdena", undefined, "1");
        }
        ).rejects.toThrow

    });

    it('obrisi narudzbu', async () => {
        let result = await Narudzba.obrisiNarudzbu(1);
        expect(result).toEqual( {
            idnarudzbe: 1,
            datumstvaranja: new Date().toJSON().split('T')[0],
            datumzaprimanja: new Date().toJSON().split('T')[0],
            status: "potvrdena",
            iddobavljaca: 1,
            mbrreferenta: "1"
        });
    });

    it('uredi artikle narudzbe', async () => {
        let result = await Narudzba.urediArtikleNarudzbe(1, [{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 1 }]);
        expect(result).toEqual([{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 1 }]);
        expect(async () => {
            await Narudzba.urediArtikleNarudzbe(1, [{ idartikla: 1, kolicina: 0 }]);
        }
        ).rejects.toThrow
    });

    it('provjeri obavezna polja', async () => {
        expect(() => Narudzba.provjeriObaveznaPolja(undefined, "potvrdena", "1", 1)).toThrow
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), undefined, "1", 1)).toThrow;
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), "potvrdena", undefined, 1)).toThrow;
        expect(() => Narudzba.provjeriObaveznaPolja(new Date(), "potvrdena", "1", undefined)).toThrow;

    });

    it('provjeri datum stvaranja', async () => {
        expect(() => Narudzba.provjeriDatumStvaranja(new Date('2022-01-01'))).toThrow
        expect(() => Narudzba.provjeriDatumStvaranja(new Date())).toThrow
    });

    it('provjeri datum zaprimanja', async () => {
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date('2028-01-01'), new Date('2028-01-02'))).toThrow 
        expect(() => Narudzba.provjeriDatumZaprimanja(new Date(), new Date())).toThrow
    });

    it('provjeri dobavljaca', async () => {
        expect(() => Narudzba.provjeriDobavljaca(3)).toThrow
    });

    it('provjeri status', async () => {
        expect(() => Narudzba.provjeriStatus("invalid")).toThrow
    });

    it('provjeri id narudzbe', async () => {
        expect(() => Narudzba.provjeriIdNarudzbe(0)).toThrow
        expect(() => Narudzba.provjeriIdNarudzbe(undefined)).toThrow
    });

    it('provjeri stavke narudzbe', async () => {
        expect(() => Narudzba.provjeriStavkeNarudzbe([{ idartikla: 1, kolicina: 0 }])).toThrow
       expect(() => Narudzba.provjeriStavkeNarudzbe([{ kolicina: 1 }])).toThrow
    });
}
);
    


