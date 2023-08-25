const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { apiRoute } = require("./routes/api.routes");

const app = express();

app.use(cors());
app.use(express.json());

connection.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use(apiRoute);

app.get("/", async(req, res) => {
    res.status(200).send({ "ok": true, "message": "welcome to backend" })
})

app.listen(5000, ()=>{
    console.log("server running");
})

module.exports = {
    app
}