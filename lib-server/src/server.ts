import cors from 'cors';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { registerRoutes } from './routes';
const PORT = config.server.port;

const app:Express = express();

app.use(express.json());
app.use(cors());

(async function startUp() {
    try {
        await mongoose.connect(config.mongo.url, {w:"majority", retryWrites:true, authMechanism:"DEFAULT"});
        console.log("Connection to MongoDB successful");       
        registerRoutes(app);
        app.listen(PORT, () => {
            console.log(`Server is listening for requests from port ${PORT}`)
        })
    } catch (error) {
        console.log("Could not make the connection to the database");
    }
})();