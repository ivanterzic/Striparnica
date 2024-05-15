import { Zaposlenik } from "../models/zaposlenik";

describe('Zaposlenik model tests ', () => {
    test('dohvati sve zaposlenike', async () => {
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        expect(zaposlenici).not.toBeNull();
    }
    );
    test('dohvati zaposlenika', async () => {
        let zaposlenik = await Zaposlenik.dohvatiSveZaposlenike();
        let zaposlenikId = zaposlenik[0].mbr;
        expect(()=> Zaposlenik.dohvatiZaposlenika(zaposlenikId)).not.toThrow();
        zaposlenikId = "nepostojeciMbr"
        expect(()=> Zaposlenik.dohvatiZaposlenika(zaposlenikId)).toThrow
        
    });

    test('dohvati zaposlenika po emailu', async () => {
        let email
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        email = zaposlenici[0].email;
        expect(await Zaposlenik.dohvatiZaposlenikaPoEmailu(email)).not.toBeNull();
        email = "nepostojeciMail"
        expect(await Zaposlenik.dohvatiZaposlenikaPoEmailu(email)).toBeNull();
    }
    );

    test('dohvati zaposlenika po oibu', async () => {
        let oib
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        oib = zaposlenici[0].oib;
        expect(await Zaposlenik.dohvatiZaposlenikaPoOibu(oib)).not.toBeNull();
        oib = "nepostojeciOib"
        expect(await Zaposlenik.dohvatiZaposlenikaPoOibu(oib)).toBeNull();
    }
    );

    test('dohvati sve referente nabave', async () => {
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        expect(referenti).not.toBeNull();
    }
    );

    test('provjeri referenta nabave', async () => {
        let referentMbr
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        referentMbr = referenti[0].mbr;
        expect(await Zaposlenik.provjeriReferentaNabave(referentMbr)).toBe(true);
        referentMbr = "nepostojeciMbr"
        expect(() => Zaposlenik.provjeriReferentaNabave(referentMbr)).toThrow
    }
    );

});
