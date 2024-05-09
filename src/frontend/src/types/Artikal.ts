export type Artikal = {
    idartikla: number;
    naziv: string;
    opis: string;
    dostupnakolicina: number;
    cijena: number;
    pdv: number;
    izdavac: string;
    izdanje: string;
    kolicina: number;
    edit: boolean;
};

export type ArtikalOsnovno = {
    idartikla: number;
    kolicina: number;
};
