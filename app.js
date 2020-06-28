const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
require("dotenv").config();

var app=express()
// app.use(cors)

mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const urlRoutes=require('./routers/urls')

app.use(bodyParser.json({ extended: false }))
app.use(cors())

app.use(urlRoutes)

const port=process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });