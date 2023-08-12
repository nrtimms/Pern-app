require('dotenv').config()
const express = require('express')
const db = require("./db")

const app = express()

app.use(express.json())

// GET ALL CLOTHING
app.get("/api/v1/test", async (req, res) =>{
    //"/api/v1/clothing"
    try{
        const results = await db.query("select * from test")
        //const results = await db.query("select * from clothing")
        console.log(results);
        res.status(200).json({
            status: "complete",
            results: results.rows.length,
            data: {
                test: results.rows
                //clothing: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// GET CLOTHING ITEM
app.get("/api/v1/test/:id", async (req,res) => {
    //"/api/v1/clothing/:id"
    try{
        const results = await db.query("select * from test where id = $1", [req.params.id])
        //const results = await db.query("select * from clothing where id = $1", [req.params.id])
        
        res.status(200).json({
            status: "complete",
            data: {
                test: results.rows[0]
                //clothing: results.row[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

// CREATE CLOTHING ITEM 
app.post("/api/v1/test", async (req, res) => {
    //"/api/v1/clothing"
    try {
      const results = await db.query(
        "INSERT INTO test (name, score) values ($1, $2) returning *",
        [req.body.name, req.body.score]
      );
      //INSET INTO clothing (photo, title, category, color, notes, favorite) values ($1, $2, $3, $4, $5, $6) returning *
      //[req.body.photo, req.body.title, req.body.category, req.body.color, req.body.notes, req.body.favorite]
      console.log(results);
      res.status(200).json({
        status: "complete",
        data: {
          test: results.rows[0],
          //clothing: results.rows[0]
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

// UPDATE CLOTHING ITEM 
app.put("/api/v1/test/:id", async (req, res) => {
    //"/api/v1/clothing/:id"
    try {
      const results = await db.query(
        "UPDATE test SET name = $1, score = $2  where id = $3 returning *",
        [req.body.name, req.body.score, req.params.id]
      );
      //UPDATE clothing SET photo = $1, title = $2, category = $3, color = $4, notes = $5, favorite = $6  where id = $7 returning *
      //[req.body.photo, req.body.title, req.body.category, req.body.color, req.body.notes, req.body.favorite, req.params.id]
  
      res.status(200).json({
        status: "complete",
        data: {
          test: results.rows[0],
          //clothing: results.rows[0]
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

// DELETE CLOTHING ITEM
app.delete("/api/v1/test/:id", async (req, res) => {
    //"/api/v1/clothing/:id"
    try {
      const results = db.query("DELETE FROM test where id = $1", [req.params.id]);
      //const results = db.query("DELETE FROM clothing where id = $1", [req.params.id]);
      res.status(200).json({
        status: "complete",
      });
    } catch (err) {
      console.log(err);
    }
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });