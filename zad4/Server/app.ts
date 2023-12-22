import express, {Request,Response,Application} from "express";
import "reflect-metadata"

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req:Request, res:Response):void => {
    res.send('Witaj świecie');
});

app.listen(3000, () => {
    console.log(`Example app listening on port ${PORT}!`);
});