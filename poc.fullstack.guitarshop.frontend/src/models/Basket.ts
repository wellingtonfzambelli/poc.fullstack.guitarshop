import { BasketItem } from "./BasketItem"

export interface Basket {
    id: string
    buyerId: string
    items: BasketItem[]
  }
  