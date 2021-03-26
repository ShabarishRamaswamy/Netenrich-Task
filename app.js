const express = require('express')
var app = express()
var PORT = 5000

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`App Running on Port: ${PORT}`)
})