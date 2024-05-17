import { Zaposlenik } from '../../models/zaposlenik';
import { ZaposlenikController } from '../../controllers/zaposlenikController';

jest.mock('../../models/zaposlenik', () => {
    return {
        Zaposlenik: {
            dohvatiSveZaposlenike: jest.fn().mockResolvedValue([
                {
                    mbr: '1234567890123',
                    ime: "Zaposlenik 1"
                }
            ]),
            dohvatiZaposlenika: jest.fn( async (mbr: string) => {
                return {
                    mbr: '1234567890123',
                    ime: "Zaposlenik 1"
                }
            }),
            dohvatiSveReferenteNabave: jest.fn().mockResolvedValue([
                {
                    mbr: '1234567890123',
                    ime: "Zaposlenik 1"
                }
            ]),
            dohvatiZaposlenikaPoEmailu: jest.fn(),
            dohvatiZaposlenikaPoOibu: jest.fn(),
        }

    }
}

);

describe('Zaposlenik controller integration tests', () => {
    
    it('apiDohvatiSveZaposlenike', async () => {
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ZaposlenikController.apiDohvatiSveZaposlenike(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(zaposlenici);
    });

    it('apiDohvatiZaposlenika', async () => {
        let zaposlenik = await Zaposlenik.dohvatiZaposlenika('1234567890123');
        const req = { params: { mbr: '1234567890123' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ZaposlenikController.apiDohvatiZaposlenika(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(zaposlenik);
    });

    it('apiDohvatiSveReferenteNabave', async () => {
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ZaposlenikController.apiDohvatiSveReferenteNabave(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(referenti);
    });

    it('apiDohvatiSveIdReferentataNabave', async () => {
        let referenti = await Zaposlenik.dohvatiSveReferenteNabave();
        let referentiId = referenti.map(referent => referent.mbr);
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ZaposlenikController.apiDohvatiSveIdReferentataNabave(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(referentiId);
    });


});