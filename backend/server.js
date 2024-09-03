const express = require('express');
const cors = require("cors");

const app = express();

const PORT = 8082;


app.get('/', (req,res) => {
    return res.json("test")
}) 

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})
