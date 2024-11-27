import { Basket } from "../models/Basket";

export interface BasketContextModel{
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: string, quantity: number) => void;
}