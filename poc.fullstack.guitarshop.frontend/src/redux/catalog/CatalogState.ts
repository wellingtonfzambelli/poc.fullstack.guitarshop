import { PaginationMetaData } from "../../models/Pagination";
import { ProductPaginationParams } from "../../models/ProductPaginationParams";

export interface CatalogState{
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productPaginationParams: ProductPaginationParams;
    paginationMetaData: PaginationMetaData | null;
}