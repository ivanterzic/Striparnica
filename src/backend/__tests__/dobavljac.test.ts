import { Dobavljac } from "../models/dobavljac";

describe('Dobavljac model tests ', () => {
    test('doahvati sve dobavljace', async () => {
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        expect(dobavljaci).not.toBeNull();
    }
    );
    test('dohvati dobavljaca', async () => {
        let dobavljac = await Dobavljac.dohvatiDobavljaca(1);
        expect(dobavljac).not.toBeNull();
        let existingDobavljacId: number,
            nonExistingDobavljacId: number;
        let dobavljaci = await Dobavljac.dohvatiSveDobavljace();
        existingDobavljacId = dobavljaci[0].iddobavljaca;
        nonExistingDobavljacId = 81236       
        expect(await Dobavljac.dohvatiDobavljaca(existingDobavljacId)).not.toBeNull();
        expect(await Dobavljac.dohvatiDobavljaca(nonExistingDobavljacId)).toBeNull();
    });

});