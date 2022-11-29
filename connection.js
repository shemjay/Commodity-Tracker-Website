const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 4000;
const jsonParser = bodyParser.json();
const fileName = 'items.json';


let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

const readFile = (
    callback,
    returnJson = false,
    filePath = fileName,
    encoding = 'utf8'
) => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (
    fileData,
    callback,
    filePath = fileName,
    encoding = 'utf8'
) => {
    fs.writeFileSync(filePath, fileData, encoding, err => {
        if (err) {
            throw err;
        }
        callback();
    });
};


//READ DATA
app.get('/', async function (request, response) {
    readFile(data => {
    response.render('home', {
    });
    }, true);
});

app.get('/items', (request, response) => {
    readFile(data => {
        // data.sort((a, b) => (a.name > b.name) ? 1 : -1);
        response.send(data);
    }, true);
});

//Adding data using POST
app.post('/items', jsonParser, (request, response) => {
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    let isOkay = false;
    if (isOkay) {
        response.end();
    }
    else {
        return response.status(400).json({
            statusCode: response.statusCode,
            method: request.method,
            message: 'That  ID has already been entered'
        });
    }
});

//EDITING DATA USING PUT
//Filtering 
app.put('/items/:itemId', jsonParser, (request, response) => {
    readFile(data => {
        const itemName = request.params['itemId'];
        const item = data.filter((st) => st.id == itemName);
        item[0]["name"] = request.body['name'].toString().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
        item[0]['date'] = request.body['date'].toString().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
        item[0]['price'] = request.body['price'].toString().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
        writeFile(JSON.stringify(data, null, 2), () => {
            response.status(200).send(`Item's name:${itemName} updated`);
        });
    }, true);
});


//DELETING DATA
app.delete('/items/:id', (req, res) => {
    readFile(data => {
        const itemId = req.params['id'];
        var itemIndex = data.findIndex(obj => obj.id == itemId);
        data.splice([itemIndex], 1)
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`item's id:${itemId} removed`);
        });
    }, true);
});
app.listen(port);
console.log('server is listening on port 4000');
