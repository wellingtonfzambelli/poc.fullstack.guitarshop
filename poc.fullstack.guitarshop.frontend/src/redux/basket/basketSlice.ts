import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Basket } from "../../models/Basket";
import APIs from "../../services/apis";


interface BasketState {
    basket: Basket | null,
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
};

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: string, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try{
            return await APIs.ApiBasket.addProduct(productId, quantity);
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: string, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try{
            return await APIs.ApiBasket.removeProduct(productId, quantity);
        }catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    
    initialState,

    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },

        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

            if(itemIndex === -1 || itemIndex === undefined)
                return;

            state.basket!.items[itemIndex].quantity -= quantity;

            if(state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
        }
    },

    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem';
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });


        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

            if(itemIndex === -1 || itemIndex === undefined)
                return;

            state.basket!.items[itemIndex].quantity -= quantity;

            if(state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);

            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const {setBasket, removeItem} = basketSlice.actions