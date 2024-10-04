let express = require('express');
let app = express();

require('dotenv').config();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
app.use(function middleWare(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);

    next();
})

app.get("/", function (req, res) {
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath)
});

app.get('/json', function(req, res) {
    console.log(process.env.MESSAGE_STYLE);
    
    if(process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message" : "Hello json"});
    }
})






























 module.exports = app;
