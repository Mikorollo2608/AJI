import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entity/Product"
import {Category} from "./entity/Category";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Product, Category],
    migrations: [],
    subscribers: [],
})
