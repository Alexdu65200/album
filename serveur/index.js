const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

let favoris = [];

app.get("/", (request, response) => {
    response.send("Hello World Of Warcraft");
});

app.get("/favoris", (request, response) => {
    response.send(favoris);
});

app.post("/favoris", (request, response) => {
    console.log(request.body['id_elm']);
    if(favoris.includes(request.body['id_elm'])){
        favoris = favoris.filter(items => items !== request.body['id_elm']);
    }else{  
        favoris.push(request.body['id_elm']);
    }
    response.send(favoris);
});

app.listen(port, err => {
    console.log('server is listening on '+port+'');
});