const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const uniqid = require('uniqid');
const dbConnect = require("./db/connect");
const Wish = require("./db/Wish");

dbConnect();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  const port = normalizePort(process.env.PORT || "4000");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
    
    Wish.find({}, (err, questions) => {
        if(!err) return response.status(200).json(questions);
        else response.status(200).json([]);
    })
  });

app.post("/", (request, response, next) => {    
    const question = new Wish (
        {
            id: uniqid(),
            name: request.body.name,
            content: request.body.content,
            arrive: request.body.arrive
        }
    )

    question.save((err) => {
        if (!err) return response.status(200).json({ question });
        return response.status(200).json({ error: err.message });
      });

        
})


app.listen( port ,() => {console.log("listening on port 4000")})