const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

//Port on which server will run
const PORT = 8082;

//create a database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_app_db",
    dateStrings: "date"
})

//List all users
app.get('/', (req, res) => {
    const sql = "SELECT * from user";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json(data);
        }
    })
})

//Create new user
app.post("/create", (req, res) => {
    const sql = "INSERT INTO user (`name`,`Email`,`Password`,`DOB`) values (?)"

    const values = [req.body.name, req.body.email, req.body.password, req.body.dob]

    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

//update user
app.put("/update/:id", (req, res) => {
    const sql = "Update user set `Name` = ? , `Email` = ?, `Password` = ? ,`DOB` = ? where Id = ?";

    const values = [req.body.name, req.body.email, req.body.password, req.body.dob]

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

//Delete user
app.delete("/delete/:id", (req, res) => {
    const sql = "Delete from user where Id = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})


//Get user details based on Id
app.get("/read/:id", (req, res) => {
    const sql = "Select * from user where Id = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        console.log(data);
        return res.json(data);
    })
})

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})
