import "reflect-metadata"
import {DataSource} from "typeorm"
import {Product} from "./entity/Product"
import {Category} from "./entity/Category";
import {OrderItem} from "./entity/OrderItem";
import {Status} from "./entity/Status";
import {Order} from "./entity/Order";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Product, Category, OrderItem, Status, Order],
    migrations: [],
    subscribers: [],
})
