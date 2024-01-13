import exp from "constants";
import {Dispatch, SetStateAction} from "react";

export interface ICategory {
    id: number;
    name: string;
}

export interface IProduct{
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    unitWeight: number;
    category: ICategory
}

export interface IFilters{
    name: string | null;
    category: ICategory | null;
}

export interface IProductExtended{
    id: number
    name: string
    description: string
    unitPrice: number
    unitWeight: number
    category: ICategory
    quantity: number
}

export interface IOrderItem{
    id: number
    quantity: number
}


export interface IUserDetails{
    username: string
    email: string
    phone: string
}

export type ICartProp = {
    cart: IProductExtended[];
    setCart: Dispatch<SetStateAction<IProductExtended[]>>
}