const express = require("express");
const { Application } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

import narudzbaRoutes from "./routes/narudzba.routes";
import dobavljacRoutes from "./routes/dobavljac.routes";
import artikalRoutes from "./routes/artikal.routes";
import zaposlenikRoutes from "./routes/zaposlenik.routes";

const app = express();
const port = 3000;

app.use(cors());
//body parser
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use("/dobavljaci", dobavljacRoutes);
app.use("/narudzbe", narudzbaRoutes);
app.use("/artikli", artikalRoutes);
app.use("/zaposlenici", zaposlenikRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
