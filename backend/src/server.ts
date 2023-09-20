//src/server.ts

import express from 'express';
import mongoose from 'mongoose';
import router from './routes/comment.routes.ts';
import { config } from 'dotenv';

config();

const PORT: number = 5000;
const URL: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2uhcfpa.mongodb.net/${process.env.MONGO_DBNAME}`;

const app = express();
app.use(express.json());
app.use(router);

mongoose
    .connect(URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err?: Error) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
