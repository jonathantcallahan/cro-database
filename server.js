var express = require('express')
var path = require('path')
var app = express()

app.use(express.static(path.join(__dirname, '/client/dist')))
var PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port ' + PORT))