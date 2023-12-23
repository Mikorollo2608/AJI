import express, {Request,Response,Application} from "express";
import {AppDataSource} from "./data-source";
import  "./AccessFunctions/ProductAccess"
import {createNewProduct, getAllProducts} from "./AccessFunctions/ProductAccess";
import {Product} from "./entity/Product";
import {Category} from "./entity/Category";
import {getAllCategories} from "./AccessFunctions/CategoryAccess";

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
    res.send("Hello World!");
});

app.get('/products', getAllProducts);
app.post('/products', createNewProduct);

app.get('/category', getAllCategories);

// await AppDataSource.manager.save(product)
// const users = await AppDataSource.manager.find(Product)
AppDataSource.initialize().then(async () => {
    app.listen(3000, () => {
        console.log(`Example app listening on port ${PORT}!`);
    });
}).catch(error => console.log(error))