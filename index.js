const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const router = require('./routes/userRoutes');
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204, 
      }
))
app.use(express.json());

app.use('/user',router);
app.get('/', (req,res)=>{
  res.send('hello world');
})
app.listen(process.env.PORT, () => {
  console.log("Server Started at port ", process.env.PORT);
});
