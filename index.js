const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { apiRoute } = require("./routes/api.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.status(200).send({"ok":true, "message":"welcome to backend"})
})

app.use("/", apiRoute);

app.listen(5000, async()=>{
    try {
        await connection;
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
    }
    console.log("server running at PORT 5000");
})