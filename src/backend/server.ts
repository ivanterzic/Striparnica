import express, { Application, Request, Response } from 'express';

const narudzbaRoutes = require('./routes/narudzba.routes');
const dobavljacRoutes = require('./routes/dobavljac.routes');

const app : Application = express();
const port = 3000;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/dobavljac', dobavljacRoutes);
app.use('/narudzba', narudzbaRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});