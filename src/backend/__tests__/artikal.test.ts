import { Artikal } from "../models/artikal";

jest.mock('@prisma/client', () => {
    const prismaClientMock = {
        artikal: {
            findMany: jest.fn().mockResolvedValue([
                { idartikla: 1, name: "Artikal 1" },
                { idartikla: 2, name: "Artikal 2" },
            ]),
            findUnique: jest.fn((args) => {
                if (args.where.idartikla === 1) {
                    return { idartikla: 1, name: "Artikal 1" };
                }
                return undefined;
            }
            )
        }
    };
    return {
        PrismaClient: jest.fn(() => prismaClientMock),
    };
});

describe('Artikal model tests', () => {
    test('dohvati sve artikle', async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        expect(artikli).toEqual([
            { idartikla: 1, name: "Artikal 1" },
            { idartikla: 2, name: "Artikal 2" },
        ]);
    });

    test('dohvati artikal', async () => {
        let artikal = await Artikal.dohvatiArtikal(1);
        expect(artikal).toEqual({ idartikla: 1, name: "Artikal 1" });
        let nonExistingArtikalId = 81236;
        artikal = await Artikal.dohvatiArtikal(nonExistingArtikalId);
        expect(artikal).toBeUndefined
    });
});
