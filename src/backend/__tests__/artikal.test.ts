import { Artikal } from "../models/artikal";

describe('Artikal model tests ', () => {
    test('doahvati sve artikle', async () => {
        let artikli = await Artikal.dohvatiSveArtikle();
        expect(artikli).not.toBeNull();
    }
    );
    test('dohvati artikal', async () => {
        let artikal = await Artikal.dohvatiArtikal(1);
        expect(artikal).not.toBeNull();
        // check what happens if you ask for an existing and non existing artikal
        let existingArikalId: number,
            nonExistingArtikalId: number;
        let artikli = await Artikal.dohvatiSveArtikle();
        existingArikalId = artikli[0].idartikla;
        nonExistingArtikalId = 81236       
        expect(await Artikal.dohvatiArtikal(existingArikalId)).not.toBeNull();
        expect(await Artikal.dohvatiArtikal(nonExistingArtikalId)).toBeNull();
    });

});
