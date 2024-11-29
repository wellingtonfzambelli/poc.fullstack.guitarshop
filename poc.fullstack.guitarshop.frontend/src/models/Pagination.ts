export interface PaginationMetaData{
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

export class PaginatedResponse<T>{
    items: T;
    paginationMetaData: PaginationMetaData;

    constructor(items:T, paginationMetaData: PaginationMetaData) {
        this.items = items;
        this.paginationMetaData = paginationMetaData;
    }
}