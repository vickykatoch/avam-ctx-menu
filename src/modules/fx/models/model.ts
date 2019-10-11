export interface ICcyCategory {
    name: string;
    instruments: Instrument[];
}

export interface Instrument {
    alias: string;
    tickSize: number;
    priceFormat: string;
}
