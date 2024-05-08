
const express = require('express');
const { Application } = require('express');

import narudzbaRoutes from './routes/narudzba.routes';
import dobavljacRoutes from './routes/dobavljac.routes';
import artikalRoutes from './routes/artikal.routes';
import zaposlenikRoutes from './routes/zaposlenik.routes';

const app = express();
const port = 3000;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use(express.static('public'));

app.use('/dobavljac', dobavljacRoutes);
app.use('/narudzba', narudzbaRoutes);
app.use('/artikal', artikalRoutes);
app.use('/zaposlenik', zaposlenikRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});