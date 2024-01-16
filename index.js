const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
host : "sql12.freesqldatabase.com",
user : "sql12677327",
password : "root",
database : "NFN4EEJYgR"
});

app.post("/save", (req, res) => {
let data = [ req.body.id, req.body.name,req.body.salary ];
let sql = "insert into Empdata values(?,?,?)";
con.query(sql, data, (err, result) =>{
if (err) res.send(err);
else     res.send(result);


});
})




app.get("/show", (req, res) => {
let sql = "select * from Empdata";
con.query(sql, (err, result) => {
if (err) res.send(err);

else    res.send(result);
});
})

app.delete("/remove", (req, res) => {
let data = [req.body.id];
let sql = "delete from Empdata where id = ?";
con.query(sql, data, (err, result) => {
if (err) res.send(err);
else     res.send(result);

});
})

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, salary } = req.body;

  if (!name && !salary) {
    return res.status(400).send("Name or Salary is required for update");
  }

  let data = [name, salary, id];
  let sql = "UPDATE emp SET name = ?, salary = ? WHERE id = ?";
  
  con.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});


app.listen(9000, () => { console.log("ready"); });

