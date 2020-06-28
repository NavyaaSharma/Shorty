const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
require("dotenv").config();

var app=express()
app.use(cors)

mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json({ extended: false }))

const urlRoutes=require('./routers/urls')

app.get('/me',(req,res)=>{
    res.json("hhhh")
})

app.use(urlRoutes)

const port=3000 || process.env.PORT

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });