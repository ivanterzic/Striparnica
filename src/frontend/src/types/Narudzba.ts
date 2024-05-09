export type Narudzba = {
    idnarudzbe: number;
    datumstvaranja: string;
    datumzaprimanja: string | null;
    status: string;
    iddobavljaca: number;
    mbrreferenta: string;
    [key: string]: any;
};
