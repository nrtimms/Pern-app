require('dotenv').config()
const express = require('express')
const db = require("./db")

const app = express()

app.use(express.json())

// GET ALL CLOTHING
app.get("/api/v1/clothing/:userEmail", async (req, res) =>{
  console.log(req)
  const userEmail = req.params
    try{
        const results = await db.query("SELECT * FROM clothing WHERE user_email = $1;", [userEmail])
        res.json(results.rows)
        // console.log(results);
        // res.status(200).json({
        //     status: "complete",
        //     results: results.rows.length,
        //     data: {
        //         test: results.rows
        //         //clothing: results.rows
        //     }
        // })
    } catch (err) {
        console.log(err)
    }
})

// GET CLOTHING ITEM
app.get("/api/v1/test/:id", async (req,res) => {
    //"/api/v1/clothing/:id"
    try{
        const results = await db.query("select * from test where id = $1;", [req.params.id])
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
app.post("/api/v1/clothing", async (req, res) => {
    const { } = req.body
    try {
      const results = await db.query(
        "INSET INTO clothing (user_email, photo, title, category, color, notes, favorite) values ($1, $2, $3, $4, $5, $6, $7) returning *;",
        [req.body.user_email, req.body.photo, req.body.title, req.body.category, req.body.color, req.body.notes, req.body.favorite]
      );
      res.json(results)
      // console.log(results);
      // res.status(200).json({
      //   status: "complete",
      //   data: {
      //     test: results.rows[0],
      //     //clothing: results.rows[0]
      //   },
      // });
    } catch (err) {
      console.log(err);
    }
  });

// EDIT CLOTHING ITEM 
app.put("/api/v1/clothing/:id", async (req, res) => {
    const { id } = req.params
    try {
      const results = await db.query(
        "UPDATE clothing SET user_email = $1, photo = $2, title = $3, category = $4, color = $5, notes = $6, favorite = $7  WHERE id = $8 returning *;",
        [req.body.photo, req.body.title, req.body.category, req.body.color, req.body.notes, req.body.favorite, req.params.id]
      );
      res.json(results)
      // res.status(200).json({
      //   status: "complete",
      //   data: {
      //     test: results.rows[0],
      //     //clothing: results.rows[0]
      //   },
      // });
    } catch (err) {
      console.log(err);
    }
  });

// DELETE CLOTHING ITEM
app.delete("/api/v1/clothing/:id", async (req, res) => {
    try {
      const results = db.query("DELETE FROM clothing WHERE id = $1;", [req.params.id]);
      res.status(200).json({
        status: "complete",
      });
    } catch (err) {
      console.log(err);
    }
  });

// SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body
  try {

  }catch (err) {
    console.error(err)
  }
})

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {

  }catch (err) {
    console.error(err)
  }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });