import express, {Request,Response,Application} from "express";
import cors from "cors";
import {AppDataSource} from "./data-source";
import {router as productRouter} from "./Routers/ProductRouter";
import {router as categoryRouter} from "./Routers/CategoryRouter";
import {router as statusRouter} from "./Routers/StatusRouter";
import {router as orderRouter} from "./Routers/OrderRouter";

const app: Application = express();
const PORT = 3000;
app.use(express.json());

const allowedOrigins = ['http://localhost:3001'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));

app.get('/', (req: Request, res: Response): void => {
    res.send("Hello World!");
});

app.use('/products', productRouter)

app.use('/categories', categoryRouter);

app.use('/status', statusRouter);

app.use('/orders', orderRouter);

// await AppDataSource.manager.save(product)
// const users = await AppDataSource.manager.find(Product)
AppDataSource.initialize().then(async () => {
    app.listen(3000, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
}).catch(error => console.log(error))