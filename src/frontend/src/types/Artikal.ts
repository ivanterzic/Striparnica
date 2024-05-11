export type Artikal = {
    idartikla: number;
    naziv: string;
    opis: string;
    dostupnakolicina: number;
    cijena: number;
    pdv: number;
    izdavac: string;
    izdanje: string;
    kolicina?: number;
    edit?: boolean;
};

export type ArtikalForm = {
    idartikla?: number | null;
    naziv: string;
    opis: string;
    dostupnakolicina: number | null;
    cijena: number | null;
    pdv: number | null;
    izdavac: string;
    izdanje: string;
    kolicina?: number | null;
};
