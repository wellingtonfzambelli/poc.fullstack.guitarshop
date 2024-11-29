import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import APIs from "../../services/apis";
import { Product } from "../../models/Product";
import { RootState } from "../store";
import { CatalogState } from "./CatalogState";
import { ProductPaginationParams } from "../../models/ProductPaginationParams";

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productPaginationParams: ProductPaginationParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productPaginationParams.pageNumber.toString());
    params.append('pageSize', productPaginationParams.pageSize.toString());
    params.append('orderBy', productPaginationParams.orderBy.toString());

    if(productPaginationParams.searchTerm)
        params.append('searchTerm', productPaginationParams.searchTerm);
    if(productPaginationParams.brands.length > 0)
        params.append('brands', productPaginationParams.brands.toString());
    if(productPaginationParams.types.length > 0)
        params.append('types', productPaginationParams.types.toString());

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productPaginationParams);

        try {
            const response = await APIs.ApiCatalog.getProducts(params);
            thunkAPI.dispatch(setPaginationMetaData(response.paginationMetaData));

            return response.items;
        }
        catch(error: unknown){
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue({ message: error.message });
            }
            return thunkAPI.rejectWithValue({ message: 'Unknown error occurred' });
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, string>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await APIs.ApiCatalog.getDetails(productId);
        }
        catch(error: any){
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue({ message: error.message });
            }
            return thunkAPI.rejectWithValue({ message: 'Unknown error occurred' });
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFilters',
    async (_, thunkAPI) => {
        try{
            return await APIs.ApiCatalog.fetchFilters();
        }catch(error: any){
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue({ message: error.message });
            }
            return thunkAPI.rejectWithValue({ message: 'Unknown error occurred' });
        }
    }
)

function initParams(){
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        searchTerm: '',
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productPaginationParams: initParams(),
        paginationMetaData: null
    }),
    reducers:{
        setProductPaginationParams: (state, action) =>{
            state.productsLoaded = false;
            state.productPaginationParams = {...state.productPaginationParams, ...action.payload, pageNumber: 1};
        },
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productPaginationParams = {...state.productPaginationParams, ...action.payload, pageNumber: 1}
        },
        setPaginationMetaData: (state, action) => {
            state.paginationMetaData = action.payload;
        },
        resetProductPaginationParams: (state) => {
            state.productPaginationParams = initParams();
        }
    },
    extraReducers:(builder => {
        builder.addCase(fetchProductsAsync.pending, (state) =>{
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
          console.log(action.payload);
          state.status = 'idle';  
        })


        builder.addCase(fetchProductAsync.pending, (state) =>{
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.rejected, (state) => {
          state.status = 'idle';  
        })


        builder.addCase(fetchFiltersAsync.pending, (state) =>{
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle'; 
        })
        builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
          state.status = 'idle';  
          console.log(action.payload);
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);
export const {setProductPaginationParams, resetProductPaginationParams, setPaginationMetaData, setPageNumber} = catalogSlice.actions;