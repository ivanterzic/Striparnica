import {Narudzba} from '../models/narudzba';
import { afterEach } from 'node:test';


jest.mock("@prisma/client", () => ({
    PrismaClient: jest.fn(() => ({
        narudzba: {
            create: jest.fn().mockImplementation((data) => {
                return {
                    idnarudzbe: 1,
                    datumstvaranja: data.datumstvaranja,
                    datumzaprimanja: data.datumzaprimanja,
                    status: data.status,
                    iddobavljaca: data.iddobavljaca,
                    mbrreferenta: data.mbrreferenta
                }
            }),
            findMany: jest.fn().mockResolvedValue([
                {
                    idnarudzbe: 1,
                    datumstvaranja: new Date(),
                    datumzaprimanja: new Date(),
                    status: "potvrdena",
                    iddobavljaca: 1,
                    mbrreferenta: "1"
                },
                {
                    idnarudzbe: 2,
                    datumstvaranja: new Date(),
                    datumzaprimanja: new Date(),
                    status: "potvrdena",
                    iddobavljaca: 1,
                    mbrreferenta: "1"
                }
            ]),
            findUnique: jest.fn().mockImplementation((data) => {
                return {
                    idnarudzbe: data.where.idnarudzbe,
                    datumstvaranja: new Date(),
                    datumzaprimanja: new Date(),
                    status: "potvrdena",
                    iddobavljaca: 1,
                    mbrreferenta: "1"
                }
            }),
            update: jest.fn().mockImplementation((data) => {
                return {
                    idnarudzbe: data.where.idnarudzbe,
                    datumstvaranja: data.data.datumstvaranja,
                    datumzaprimanja: data.data.datumzaprimanja,
                    status: data.data.status,
                    iddobavljaca: data.data.iddobavljaca,
                    mbrreferenta: data.data.mbrreferenta
                }
            }),
            delete: jest.fn().mockImplementation((data) => {
                return {
                    idnarudzbe: data.where.idnarudzbe,
                    datumstvaranja: new Date(),
                    datumzaprimanja: new Date(),
                    status: "potvrdena",
                    iddobavljaca: 1,
                    mbrreferenta: "1"
                }
            },

            ),
            findFirst: jest.fn().mockImplementation((data) => {
                return {
                    idnarudzbe: 2
                }
            }
            ),
        },
        narudzbaartikli: {
            findMany: jest.fn().mockResolvedValue([
                {
                    idnarudzbe: 1,
                    idartikla: 1,
                    kolicina: 1
                },
                {
                    idnarudzbe: 1,
                    idartikla: 2,
                    kolicina: 1
                }
            ]),
            deleteMany: jest.fn().mockResolvedValue({ count: 2 }),
            createMany: jest.fn().mockImplementation((data) => {
                return data.data;
            })
        },

        artikal: {
            findUnique: jest.fn().mockImplementation((data) => {
                return {
                    idartikla: data.where.idartikla,
                    naziv: "Artikal " + data.where.idartikla
                }
            }),
            findMany: jest.fn().mockResolvedValue([
                {
                    idartikla: 1,
                    naziv: "Artikal 1"
                },
                {
                    idartikla: 2,
                    naziv: "Artikal 2"
                }
            ])
        }
    }))
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
        let date = new Date();
        let result = await Narudzba.kreirajNarudzbu(date, date, "potvrdena", 1, "1");
        expect(async () => {
            await Narudzba.kreirajNarudzbu(undefined, date, "potvrdena", 1, "1");
        }).rejects.not.toThrow
        expect(async () => {
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
        expect(async () => {
            await Narudzba.kreirajNarudzbu(new Date(), new Date(), "potvrdena", 1, undefined);
        }
        ).rejects.toThrow
    }
    );

    it('dohvati sve narudzbe', async () => {
        let result = await Narudzba.dohvatiSveNarudzbe();
        expect(result).toEqual([
            {
                idnarudzbe: 1,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            },
            {
                idnarudzbe: 2,
                datumstvaranja: new Date().toJSON().split('T')[0],
                datumzaprimanja: new Date().toJSON().split('T')[0],
                status: "potvrdena",
                iddobavljaca: 1,
                mbrreferenta: "1"
            }
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
                {
                    idartikla: 1,
                    naziv: "Artikal 1",
                    kolicina: 1
                },
                {
                    idartikla: 2,
                    naziv: "Artikal 2",
                    kolicina: 1
                }
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


    it('azuriraj narudzbu', async () => {
        let date = new Date();
        let result = await Narudzba.azurirajNarudzbu(1, date, date, "potvrdena", 1, "1");
        expect(result).toEqual({
            idnarudzbe: 1,
            datumstvaranja: date.toJSON().split('T')[0],
            datumzaprimanja: date.toJSON().split('T')[0],
            status: "potvrdena",
            iddobavljaca: 1,
            mbrreferenta: "1"
        });
        expect(async () => {
            await Narudzba.azurirajNarudzbu(undefined, new Date(), new Date(), "potvrdena", 1, "1");
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
        expect(async () => {
            await Narudzba.azurirajNarudzbu(1, new Date(), new Date(), "potvrdena", 1, undefined);
        }
        ).rejects.toThrow

    });

    it('obrisi narudzbu', async () => {
        let date
        expect(async () => {
            await Narudzba.obrisiNarudzbu(1);
        }
        ).not.toThrow
        expect(async () => {
            await Narudzba.obrisiNarudzbu(0);
        }
        ).rejects.toThrow
    });

    it('uredi artikle narudzbe', async () => {
        let result = await Narudzba.urediArtikleNarudzbe(1, [{ idartikla: 1, kolicina: 1 }, { idartikla: 2, kolicina: 1 }]);
        expect(result).toEqual([{ idnarudzbe: 1, idartikla: 1, kolicina: 1 }, { idnarudzbe: 1, idartikla: 2, kolicina: 1 }]);
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
    


