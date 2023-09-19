import express from 'express';
import mongoose from 'mongoose';

const PORT: number = 5000;
const URL: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2uhcfpa.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, (err?: Error) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
