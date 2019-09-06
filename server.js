const express = require("express");
const path = require("path");
const router = require("./controllers/htmlRoutes")

const app = express();

app.use(router);

app.listen(process.env.PORT || 4000,function(){
    console.log("Working...");
});

