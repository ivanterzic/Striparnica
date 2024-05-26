
import { Zaposlenik } from "../models/zaposlenik";
jest.mock('@prisma/client', () => {
    const prismaClientMock = {
        zaposlenik: {
            findMany: jest.fn().mockResolvedValue([
                { mbr: "1", name: "Zaposlenik 1" },
                { mbr: "2", name: "Zaposlenik 2" },
            ]),
            findUnique: jest.fn((args) => {
                if (args.where.mbr === "1") {
                    return { mbr: "1", name: "Zaposlenik 1" };
                }
                return undefined;
            }
            )
        }
    };
    return {
        PrismaClient: jest.fn(() => prismaClientMock)
    };
});

describe('Zaposlenik model tests', () => {
    test('dohvati sve zaposlenike', async () => {
        let zaposlenici = await Zaposlenik.dohvatiSveZaposlenike();
        expect(zaposlenici).not.toBeNull();
    } );

    test('dohvati zaposlenika', async () => {
        let zaposlenik = await Zaposlenik.dohvatiZaposlenika("1");
        expect(zaposlenik).not.toBeNull();
        expect(async () => {
            await Zaposlenik.dohvatiZaposlenika("3");
        }
        ).toThrow
    }
    );

});
