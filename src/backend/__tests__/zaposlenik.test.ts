import { Zaposlenik } from "../models/zaposlenik";

jest.mock("../models/zaposlenik", () => ({
    Zaposlenik: {
        dohvatiSveZaposlenike: jest.fn().mockResolvedValue([
            { mbr: "1", email: "test1@example.com", oib: "11111111111" },
            { mbr: "2", email: "test2@example.com", oib: "22222222222" },
        ]),
        dohvatiZaposlenika: jest.fn(),
        dohvatiZaposlenikaPoEmailu: jest.fn(),
        dohvatiZaposlenikaPoOibu: jest.fn(),
        dohvatiSveReferenteNabave: jest.fn(),
        provjeriReferentaNabave: jest.fn(),
    },
}));

describe('Zaposlenik model tests', () => {
    test('dohvati sve zaposlenike', async () => {
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        expect(zaposlenici).not.toBeNull();
    } );

    test('dohvati zaposlenika', async () => {
        Zaposlenik.dohvatiZaposlenika = jest.fn().mockResolvedValueOnce({ mbr: "1", email: "test1@example.com", oib: "11111111111" });
        let zaposlenik = await Zaposlenik.dohvatiZaposlenika("1");
        expect(zaposlenik).not.toBeNull();
        zaposlenik = await Zaposlenik.dohvatiZaposlenika("4");
        expect(zaposlenik).toBeUndefined

    }
    );

});
