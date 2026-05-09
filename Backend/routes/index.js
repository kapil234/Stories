const express=require("express");
const signUp = require("../controllers/signUp");
const login = require("../controllers/login");
const scrapeStories = require("../Services/Scrapper");
const getStories = require("../controllers/stories");
const auth = require("../middleware/auth");
const toggleBookmark = require("../controllers/toggleBookmark");
const getSingleStory = require("../controllers/getSingleStory");
const Logout = require("../controllers/logout");
const user = require("../controllers/user");
const router=express.Router();
//===============================
router.post("/signup",signUp)
router.post("/login",login)

//======================stories Api===================
router.get("/stories", getStories);
router.get("/stories/:id",getSingleStory);
router.post("/stories/bookmark/:id",auth,toggleBookmark)
router.post("/logout",auth,Logout)
router.get("/user",auth,user)
module.exports=router;