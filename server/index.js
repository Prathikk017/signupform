const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({ 
    user: "root",
    host: "localhost",
    password: "password",
    database: "registeruser",
});


app.post("/create", (req, res) =>{
    
    const name = req.body.name;
    const dateofbirth = req.body.dateofbirth;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    
    db.query(
        "INSERT INTO users (name, dateofbirth, email, phone, password) VALUES(?,?,?,?,?)", [name, dateofbirth, email, phone, password], (err, result) => {
            if(err){
                console.log(err);
            }else{
                res.send("Values Inserted");
            }
        } 
        );
    });

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result)=>{
  if (err) {
    console.log(err);
  }else{
    res.send(result);
  }
  })
}); 

app.put("/update", (req, res)=>{
  const id = req.body.id;
  const email = req.body.email;
  db.query("UPDATE users SET email = ? WHERE id = ?", 
  [email, id], 
  (err, result) =>{
    if(err) {
        console.log(err);
    }else{
        res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) =>{
   const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", id, (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
app.listen(3001, ()=>{
    console.log("hey, your server is running on port 3001");
});

