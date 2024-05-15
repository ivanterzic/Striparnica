import { Dobavljac } from "../models/dobavljac";

describe('Dobavljac model tests', () => {
    test('dohvati sve dobavljace', async () => {
        Dobavljac.dohvatiSveDobavljace = jest.fn().mockResolvedValue(['dobavljac1', 'dobavljac2']);

        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        expect(dobavljaci).toEqual(['dobavljac1', 'dobavljac2']);
    });

    test('dohvati dobavljaca', async () => {
        Dobavljac.dohvatiDobavljaca = jest.fn().mockImplementation(async (id: number) => {
            if (id === 1) {
                return 'dobavljac1';
            } else {
                return null;
            }
        });

        let dobavljac = await Dobavljac.dohvatiDobavljaca(1);
        expect(dobavljac).toEqual('dobavljac1');

        let nonExistingDobavljacId = 81236;
        dobavljac = await Dobavljac.dohvatiDobavljaca(nonExistingDobavljacId);
        expect(dobavljac).toBeNull();
    });
});