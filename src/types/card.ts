

export interface IPostCardPayload {
    name: string;
    date_received: Date;
    price: number;
    condition: number;
    pokemon_tcg_id: string;
    pokemon_tcg_data: any;
    pieces: number;
    remarks: string;
}

export interface ICard extends IPostCardPayload {
    id: string;
    created_at: string;
    updated_at: string;
}


export interface IPostCardResponse {
    success: boolean;
    data: IPostCardPayload;
    message: string;
}
export interface IQuery {
    name: string;
    sortBy: string[];
    sortOrder: string[];
    types: string[];
}

export interface ICardQuery extends IQuery {
    page: number;
    pageSize: number;
}

export interface IGetCardDataResponse {
    data: ICard[];
    total: number;
    page: number;
    pageSize: number;
}

export interface IGetCardResponse {
    data: IGetCardDataResponse;
    success: boolean;
    message: string;
}