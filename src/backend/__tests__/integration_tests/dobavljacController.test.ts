import { Dobavljac } from '../../models/dobavljac';
import { DobavljacController } from '../../controllers/dobavljacController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Dobavljac controller integration tests', () => {
    it('apiDohvatiDobavljaca', async () => {
        let o = await Dobavljac.dohvatiSveDobavljace();
        let id = o[0].iddobavljaca;
        let resultDobavljac = await prisma.dobavljac.findUnique({ where: { iddobavljaca: id } });
        let req = { params: { id: id } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(resultDobavljac);

        let badID = 0;
        req = { params: { id: badID } };
        res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        resultDobavljac = await prisma.dobavljac.findUnique({ where: { iddobavljaca: badID } });
        await DobavljacController.apiDohvatiDobavljaca(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('apiDohvatiSveDobavljace', async () => {
        let dobavljaci = await prisma.dobavljac.findMany();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveDobavljace(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljaci);
    });

    it('apiDohvatiSveId', async () => {
        let dobavljaci = await prisma.dobavljac.findMany();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await DobavljacController.apiDohvatiSveId(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(dobavljaci.map((dobavljac) => dobavljac.iddobavljaca));
    });
});