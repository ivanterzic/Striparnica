import { Dobavljac } from "../models/dobavljac";

jest.mock('@prisma/client', () => {
    const prismaClientMock = {
        dobavljac: {
            findMany: jest.fn().mockResolvedValue([
                { iddobavljaca: 1, name: "dobavljac1" },
                { iddobavljaca: 2, name: "dobavljac2" },
            ]),
            findUnique: jest.fn((args) => {
                if (args.where.iddobavljaca === 1) {
                    return { iddobavljaca: 1, name: "dobavljac1" };
                }
                return undefined;
            })
        }
    };
    return {
        PrismaClient: jest.fn(() => prismaClientMock)
    };
});

describe('Dobavljac model tests', () => {
    
    test('dohvati sve dobavljace', async () => {
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        expect(dobavljaci).toEqual([
            { iddobavljaca: 1, name: "dobavljac1" },
            { iddobavljaca: 2, name: "dobavljac2" },
        ]);
    });

    test('dohvati dobavljaca', async () => {
        let dobavljac = await Dobavljac.dohvatiDobavljaca(1);
        expect(dobavljac).toEqual({ iddobavljaca: 1, name: "dobavljac1" });
        dobavljac = await Dobavljac.dohvatiDobavljaca(3);
        expect(dobavljac).toBeUndefined();
    });
});