import { PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/Basket";
import { BasketContext } from "./BasketContext"

export function useBasketContext() {
    const context = useContext(BasketContext);

    if(context === undefined){
        throw Error("Oops - we are not inside the app.tsx so we do not have access to the context.");
    }

    return context;
}

export function BasketProvider({children}: PropsWithChildren<unknown>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItem(productId: string, quantity: number) {
        if(!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);

        if(itemIndex >= 0) {
            items[itemIndex].quantity -= quantity;

            if(items[itemIndex].quantity === 0)
                items.splice(itemIndex, 1);

            setBasket(prevState =>{
                return {...prevState!, items}
            })
        }
    }

    return (
        <BasketContext.Provider value={{ basket, setBasket, removeItem }}>
            {children}
        </BasketContext.Provider>
    )
};