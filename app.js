const express = require('express')
var app = express()
var PORT = 5000
const pool = require('./db')

/**
 * @method - GET
 * @route - /
 * @description - The Homepage
 */
app.get('/', (req, res) => {
    res.send("Hello")
})

/**
 * @method - GET
 * @route - /shipments/:customer_id
 * @description - The Homepage
 */
app.get('/shipments/:customer_id', (req, res) => {
    res.send("Hello")
})

/**
 * @method - GET
 * @route - /customer/:customer_id
 * @description - The Homepage
 */
app.get('/customer/:customer_id', (req, res) => {
    res.send("Hello")
})

/**
 * @method - DELETE
 * @route - /customer/:customer_id
 * @description - The Homepage
 */
app.delete('/customer/:customer_id', (req, res) => {
    res.send("Hello")
})

/**
 * @method - GET
 * @route - /orders/:order_id
 * @description - The Homepage
 */
app.get('/orders/:order_id', (req, res) => {
    res.send("Hello")
})

/**
 * @method - DELETE
 * @route - /orders/:order_id
 * @description - The Homepage
 */
app.delete('/orders/:order_id', (req, res) => {
    res.send("Hello")
})


app.listen(PORT, () => {
    console.log(`App Running on Port: ${PORT}`)
})