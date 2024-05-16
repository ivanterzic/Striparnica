import { Artikal } from '../../models/artikal';
import { ArtikalController } from '../../controllers/artikalController';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Artikal controller integration tests', () => {
    it('apiDohvatiArtikal', async () => {
        let o = await Artikal.dohvatiSveArtikle();
        let id = o[0].idartikla;
        let resultArtikal = await prisma.artikal.findUnique({ where: { idartikla: id } });
        let req = { params: { id: id } };
        let res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiArtikal(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(resultArtikal);

        let badID = 0;
        req = { params: { id: badID } };
        res = { json: jest.fn(),
            status: jest.fn().mockReturnThis() };
        resultArtikal = await prisma.artikal.findUnique({ where: { idartikla: badID } });
        await ArtikalController.apiDohvatiArtikal(req as any, res as any);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('apiDohvatiSveArtikle', async () => {
        let artikli = await prisma.artikal.findMany();
        const req = {};
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        await ArtikalController.apiDohvatiSveArtikle(req as any, res as any);
        expect(res.json).toHaveBeenCalledWith(artikli);
    });

}
);