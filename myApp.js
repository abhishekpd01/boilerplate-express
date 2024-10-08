let express = require('express');
let app = express();

const bodyParser = require("body-parser");

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
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

app.get("/now", function middleware(req, res, next) {
    req.time = new Date().toString();

    next();
}, function(req, res){
    res.json({"time" : req.time});
});

app.get("/:word/echo", (req, res) => {
    res.json({echo: req.params.word});
})

app.route("/name")
    .get( function(req, res) {
        var firstName = req.query.first;
        var lastName = req.query.last;
        res.json({
            name: `${firstName} ${lastName}`
        });
    })
    .post(function(req, res) {
        var string = req.body.first + " " + req.body.last;
        res.json({name : string});
    })
























 module.exports = app;
