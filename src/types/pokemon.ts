export interface IFetchPokemonQuery {
    page: number;
    pageSize: number
}

export interface IPokemon {
    id: number;
    name: string;
    images: {
        small: string;
        large: string
    },
    types: string[];
    set: {
        name: string;
        series: string;
        ptcgoCode: string;
        images: {
            symbol: string;
            logo: string;
        }
    }
}

export interface IPokemonQuery {
    page: number;
    pageSize: number;
    name: string;
}

export interface IPokemonDataResponse {
    data: IPokemon[];
    total: number;
    page: number;
    pageSize: number;
}

export interface IPokemonResponse {
    data: IPokemonDataResponse;
    success: boolean;
    message: string;
}