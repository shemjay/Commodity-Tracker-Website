app.post('/students', jsonParser, (request, response) => {
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
            message: 'That currency ID has already been entered'
        });
    }

});

// if (data['id'] == request.body.id) {
//   alert('wewe ni ngombe')
// }
