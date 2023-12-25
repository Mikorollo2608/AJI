import express, {Request,Response,Application} from "express";
import {AppDataSource} from "./data-source";
import {router as productRouter} from "./Routers/ProductRouter";
import {router as categoryRouter} from "./Routers/CategoryRouter";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send("Hello World!");
});

app.use('/products', productRouter)

app.use('/category', categoryRouter);

// await AppDataSource.manager.save(product)
// const users = await AppDataSource.manager.find(Product)
AppDataSource.initialize().then(async () => {
    app.listen(3000, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
}).catch(error => console.log(error))