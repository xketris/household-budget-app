const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());

app.get("/", (req, res) => {
    res.json("Valid response");
})

app.listen(3000);