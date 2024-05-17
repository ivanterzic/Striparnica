import { Dobavljac } from '../../models/dobavljac';
import { DobavljacController } from '../../controllers/dobavljacController';

jest.mock('../../models/dobavljac', () => {
    return {
        Dobavljac: {
            dohvatiSveDobavljace: jest.fn().mockResolvedValue([
                {
                    iddobavljaca: 1,
                    ime: "Dobavljac 1"
                }
            ]),
            dohvatiDobavljaca: jest.fn( async (id: number) => {
                return {
                    iddobavljaca: 1,
                    ime: "Dobavljac 1"
                }
            } )

        }
    }
});

describe('Dobavljac controller integration tests', () => {
   
    it('apiDohvatiSveDobavljace', async () => {
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveDobavljace(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljaci);
    });

    it('apiDohvatiDobavljaca', async () => {
        let dobavljac = await Dobavljac.dohvatiDobavljaca(1);
        const req = { params: { id: 1 } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljac);
    });

    it('apiDohvatiSveId', async () => {
        let idovi = await Dobavljac.dohvatiSveDobavljace();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveId(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(idovi.map((dobavljac: any) => dobavljac.iddobavljaca));
    });

});