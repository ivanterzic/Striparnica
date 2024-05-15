import { PrismaClient } from '@prisma/client';
import { Dobavljac } from './dobavljac';
import { Artikal } from './artikal';
import { Zaposlenik } from './zaposlenik';
const prisma = new PrismaClient();

const statusiNarudzbe = ["potvrdena", "u tijeku", "nepotpuna"];

const narudzbaClass =

        class Narudzba {
                        
            idnarudzbe: number;
            datumstvaranja: Date;
            datumzaprimanja: Date | null;
            status: string;
            mbrreferenta: string;
            iddobavljaca: number;
            
            private constructor(id: number, datumstvaranja: Date, datumzaprimanja: Date | null, status: string, iddobavljaca: number, mbrreferenta: string) { 
                this.idnarudzbe = id;
                this.datumstvaranja = datumstvaranja;
                this.datumzaprimanja = datumzaprimanja;
                this.status = status;
                this.iddobavljaca = iddobavljaca;
                this.mbrreferenta = mbrreferenta;
            }

            
            static async kreirajNarudzbu(
                datumstvaranja: Date,
                datumzaprimanja: Date | null,
                status: string,
                iddobavljaca: number,
                mbrreferenta: string
            ) {
                Narudzba.provjeriObaveznaPolja(datumstvaranja, status, mbrreferenta, iddobavljaca);
                Narudzba.provjeriDatumStvaranja(datumstvaranja);
                if (datumzaprimanja) {
                    Narudzba.provjeriDatumZaprimanja(datumzaprimanja, datumstvaranja);
                }
                await Narudzba.provjeriDobavljaca(iddobavljaca);
                await Zaposlenik.provjeriReferentaNabave(mbrreferenta);
                Narudzba.provjeriStatus(status);

                let result = await prisma.narudzba.create({
                    data: {
                        datumstvaranja: datumstvaranja,
                        datumzaprimanja: datumzaprimanja,
                        status: status,
                        iddobavljaca: iddobavljaca,
                        mbrreferenta: mbrreferenta

                    }
                });
                return {
                    idnarudzbe: result.idnarudzbe,
                    datumstvaranja: result.datumstvaranja ? result.datumstvaranja.toJSON().split('T')[0] : null,
                    datumzaprimanja: result.datumzaprimanja ? result.datumzaprimanja.toJSON().split('T')[0] : null,
                    status: result.status,
                    iddobavljaca: result.iddobavljaca,
                    mbrreferenta: result.mbrreferenta
                }
            }

            static async dohvatiSveNarudzbe() {
                let result = await prisma.narudzba.findMany(
                    {orderBy: {idnarudzbe: 'asc'}}
                );
                let result2 = [];
                for (let r of result) {
                    result2.push({
                        idnarudzbe: r.idnarudzbe,
                        datumstvaranja: r.datumstvaranja ? r.datumstvaranja.toJSON().split('T')[0] : null,
                        datumzaprimanja: r.datumzaprimanja ? r.datumzaprimanja.toJSON().split('T')[0] : null,
                        status: r.status,
                        iddobavljaca: r.iddobavljaca,
                        mbrreferenta: r.mbrreferenta
                    });
                }
                return result2;
            }   
    
            static async dohvatiNarudzbu(id: number) {
                Narudzba.provjeriIdNarudzbe(id);
                let result = await prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                });
                let artikli = await prisma.narudzbaartikli.findMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                let artikliProsireno = [];
                for (let a of artikli) {
                    let art = await prisma.artikal.findUnique({
                        where: {
                            idartikla: a.idartikla
                        }
                    });
                    artikliProsireno.push({
                        ...art,
                        kolicina: a.kolicina
                    });
                }
                return {
                    narudzba : {
                        idnarudzbe: result?.idnarudzbe,
                        datumstvaranja: result?.datumstvaranja ? result?.datumstvaranja.toJSON().split('T')[0] : null,
                        datumzaprimanja: result?.datumzaprimanja ? result?.datumzaprimanja.toJSON().split('T')[0] : null,
                        status: result?.status,
                        iddobavljaca: result?.iddobavljaca,
                        mbrreferenta: result?.mbrreferenta
                    
                    },
                    artikli : artikliProsireno
                }
            }

            static async dohvatiSveStatuseNarudzbi() {
                return statusiNarudzbe;
            }

            static async dohvatiPrviVeciID(id: number) {
                Narudzba.provjeriIdNarudzbe(id);
                let result = await prisma.narudzba.findFirst({
                    where: {
                        idnarudzbe: {
                            gt: id
                        }
                    },
                    orderBy: {
                        idnarudzbe: 'asc'
                    }
                });
                return result?.idnarudzbe;
            }

            static async dohvatiPrviManjiID(id: number) {
                Narudzba.provjeriIdNarudzbe(id);
                let result = await prisma.narudzba.findFirst({
                    where: {
                        idnarudzbe: {
                            lt: id
                        }
                    },
                    orderBy: {
                        idnarudzbe: 'desc'
                    }
                });
                return result?.idnarudzbe;
            }
   
            static async azurirajNarudzbu(
                id : number,
                datumstvaranja: Date,
                datumzaprimanja: Date | null,
                status: string,
                iddobavljaca: number,
                mbrreferenta: string
            ) {
                Narudzba.provjeriIdNarudzbe(id);
                Narudzba.provjeriObaveznaPolja(datumstvaranja, status, mbrreferenta, iddobavljaca);
                Narudzba.provjeriDatumStvaranja(datumstvaranja);
                if (datumzaprimanja) {
                    Narudzba.provjeriDatumZaprimanja(datumzaprimanja, datumstvaranja);
                }
                await Narudzba.provjeriDobavljaca(iddobavljaca);
                await Zaposlenik.provjeriReferentaNabave(mbrreferenta);
                Narudzba.provjeriStatus(status);

                let result = await prisma.narudzba.update({
                    where: {
                        idnarudzbe: id
                    },
                    data: {
                        datumstvaranja: datumstvaranja,
                        datumzaprimanja: datumzaprimanja,
                        status: status,
                        iddobavljaca: iddobavljaca,
                        mbrreferenta: mbrreferenta
                    }
                });
                return {
                    idnarudzbe: result.idnarudzbe,
                    datumstvaranja: result.datumstvaranja ? result.datumstvaranja.toJSON().split('T')[0] : null,
                    datumzaprimanja: result.datumzaprimanja ? result.datumzaprimanja.toJSON().split('T')[0] : null,
                    status: result.status,
                    iddobavljaca: result.iddobavljaca,
                    mbrreferenta: result.mbrreferenta
                };
            }

            static async obrisiNarudzbu(id: number) {
                Narudzba.provjeriIdNarudzbe(id);
                let result2 = await prisma.narudzbaartikli.deleteMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                let result = await prisma.narudzba.delete({
                    where: {
                        idnarudzbe: id
                    }
                });
                return result;
            }

            static async urediArtikleNarudzbe(id: number, artikli: Array<{
                idartikla: number
                kolicina: number
            }>) {
                Narudzba.provjeriIdNarudzbe(id);
                Narudzba.provjeriStavkeNarudzbe(artikli);
                let narudzba = await prisma.narudzba.findUnique({
                    where: {
                        idnarudzbe: id
                    }
                });
                for (let artikal of artikli) {
                    let result = await prisma.artikal.findUnique({
                        where: {
                            idartikla: artikal.idartikla
                        }
                    });
                }
                let result = await prisma.narudzbaartikli.deleteMany({
                    where: {
                        idnarudzbe: id
                    }
                });
                let result2 = await prisma.narudzbaartikli.createMany({
                    data: artikli.map((a) => {
                        return {
                            idnarudzbe: id,
                            idartikla: a.idartikla,
                            kolicina: a.kolicina
                        }
                    })
                });
                return result2;
            }

            static provjeriObaveznaPolja(datumstvaranja: Date, status: string, mbrreferenta: string, iddobavljaca: number) {
                if (!datumstvaranja || !status || !mbrreferenta || !iddobavljaca) {
                    throw 'Nedostaju obavezna polja.';
                }
            }


            static async provjeriDatumStvaranja(datumstvaranja: Date) {
                if (isNaN(datumstvaranja.getTime())) {
                    throw 'Datum stvaranja nije validan datum.';
                }
                if (datumstvaranja.getTime() > Date.now()) {
                    throw 'Datum stvaranja ne može biti u budućnosti.';
                }
            }

            static async provjeriDatumZaprimanja(datumzaprimanja: Date, datumstvaranja: Date) {
                if (isNaN(datumzaprimanja.getTime())) {
                    throw 'Datum zaprimanja nije validan datum.';
                }
                if (datumzaprimanja.getTime() < datumstvaranja.getTime()) {
                    throw 'Datum zaprimanja mora biti nakon datuma stvaranja.';
                }
            }

            static async provjeriDobavljaca(iddobavljaca: number) {
                let dobavljaci = await Dobavljac.dohvatiSveDobavljace()
                let dobavljaciID = dobavljaci.map((d) => d.iddobavljaca);
                if (!dobavljaciID.includes(iddobavljaca)) {
                    throw 'Id dobavljača nije među validnim dobavljačima.';
                }
            }

            static async provjeriStatus(status: string) {
                if (!statusiNarudzbe.includes(status)) {
                    throw 'Status nije među validnim statusima narudžbe.';
                }
            }

            static async provjeriIdNarudzbe(id: number) {
                let narudzbe = await Narudzba.dohvatiSveNarudzbe();
                let narudzbeID = narudzbe.map((n) => n.idnarudzbe);
                if (!narudzbeID.includes(id)) {
                    throw 'Id narudžbe nije validan.';
                }
            }

            static async provjeriStavkeNarudzbe(stavke: Array<{
                idartikla: number
                kolicina: number
            }>) {
                if (!stavke) {
                    throw 'Nedostaju stavke narudžbe.';
                }
                let artikli;
                try {
                    artikli = await Artikal.dohvatiSveArtikle();
                }
                catch (err) {
                    throw 'Greška prilikom dohvaćanja artikala.';
                }
                let artikliID = artikli.map((a) => a.idartikla);
                let stavkenarudzbe
                try {
                    stavkenarudzbe = typeof stavke === 'string' ? JSON.parse(stavke) : stavke;
                }
                catch (err) {
                    throw 'Stavke narudžbe nisu u validnom formatu.';
                }
                for (let stavka of stavkenarudzbe) {
                    if (!stavka.idartikla || stavka.kolicina == undefined || stavka.kolicina == null) {
                        throw 'Nedostaju obavezna polja u stavci narudžbe.';
                    }
                    if (typeof stavka.kolicina != 'number') {
                        throw 'Količina mora biti broj.';
                    }
                    if (stavka.kolicina <= 0) {
                        throw 'Količina mora biti veća od 0.';
                    }
                    if (!artikliID.includes(stavka.idartikla)) {
                        throw 'Id artikla nije među validnim artiklima.';
                    }
                }

            }

    };

export { narudzbaClass as Narudzba };
