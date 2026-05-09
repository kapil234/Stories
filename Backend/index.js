const cors=require('cors')
const express=require("express");
require("dotenv").config();
const connectDB=require("./config/db");
const router = require('./routes');
const cookieParser = require('cookie-parser');
const scrapeStories = require("./Services/Scrapper");
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))
app.use("/api",router)


const Port=8081;
async function startServer() {
  try {
    await connectDB();

    console.log("Connected to DB");

    await scrapeStories();

    console.log("Stories scraped");

    app.listen(8081, () => {
    console.log(`Server is running http://localhost:${Port}`)
    });

  } catch (error) {
    console.log(error);
  }
}

startServer();    
        
