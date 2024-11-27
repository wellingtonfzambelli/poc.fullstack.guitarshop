
import { createContext } from "react";
import { BasketContextModel } from "./BasketContextModel";

export const BasketContext = createContext<BasketContextModel | undefined>(undefined);