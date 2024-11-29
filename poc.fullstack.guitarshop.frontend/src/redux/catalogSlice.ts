import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import APIs from "../services/apis";
import { Product } from "../models/Product";
import { RootState } from "./store";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try {
            return await APIs.ApiCatalog.getProducts();
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

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers:{},
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
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);