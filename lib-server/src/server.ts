import cors from 'cors';
import express, { Express, Request, Response } from 'express';
const PORT = 8000;

const app:Express = express();

app.use(express.json());
app.use(cors());


app.get("/health", (req:Request, res:Response) => {
    res.status(200).json({message: `Server is running a healthcheck from port ${PORT}`})
})

app.listen(PORT, () => {
    console.log(`Server is listening for requests from port ${PORT}`)
})