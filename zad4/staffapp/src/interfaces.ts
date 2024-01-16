export interface IProduct{
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    unitWeight: number;
    category: ICategory
}

export interface IOrderItem{
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    unitWeight: number;
    quantity: number
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IError{
    cause:string
    msg:string
}

export interface IStatus {
    id: number
    status: string
}

export interface IOrder{
    id: number
    orderItems: IOrderItem[]
    status: IStatus
    dateOfApproval: Date
    username: string
    email: string
    phone: string
}