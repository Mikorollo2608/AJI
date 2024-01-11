export interface ICategory {
    id: number
    name: string
}

export interface IProduct{
    id: number
    name: string
    description: string
    unitPrice: number
    unitWeight: number
    category: ICategory
}

