const port = process.env.port || 8080;

const cors = require("cors");

global.fetch = require("node-fetch");
var cron = require('node-cron');
const bodyParser = require("body-parser");

const file = 'my.txt';

const express = require('express');
const router = express.Router();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/*------------file read function start ------------------*/


/*------------file read function end ------------------*/

/*------------file write function start ------------------*/

const jsonfile = require('./index');
const { json } = require("express");
var URL = 'https://thereviewsolution.com/app/index.php/api/v3/GetExpressBBBEndpointv3/access_token/STR5555555555/bbbid/0382';

var task = cron.schedule('0 0 * * *', () => {
    fetch(URL, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(async data => {

            jsonfile.writeFile(file, data)
                .then(res => {
                    console.log('Write complete')
                })
                .catch(error => console.error(error))
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

app.get('/readfile', function(req, res) {

    console.log("GET From SERVER");
    jsonfile.readFile(file)
        .then(obj => {
            res.send(obj);
        })
        .catch(error => console.error("geterror"));
    //res.send(obj);

});

app.post('/readfile', function(req, res) {
    var ingredient = req.body;
    //console.log(req.body);
    var ingredients = jsonfile.readFile(file)
        .then(obj => console.dir("postobj"))
        .catch(error => console.error("posterror"));
    ingredients.push(ingredient);
    //console.log(ingredients);
    res.send(req.body);
});

app.use("/", router);


app.listen(port, () => {
    console.log('server upo');
    task.start();
});