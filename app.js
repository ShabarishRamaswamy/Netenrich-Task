const express = require('express')
var app = express()
var PORT = 5000
const pool = require('./db')
const router = require('./populate_db/populate')

app.use(express.json())
app.use(router)

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
 * @description - Returns a list of shipments associated with the given customer id.
 */
app.get('/shipments/:customer_id', async(req, res) => {
    try{
        var customer_id = req.params.customer_id
        var shipments = await pool.query(
            "SELECT * FROM shipment WHERE customer_id = $1",
            [customer_id]
        )
        res.json(shipments.rows)
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - GET
 * @route - /customer/:customer_id
 * @description - Returns Customer ID and Customer name
 */
app.get('/customer/:customer_id', async(req, res) => {
    try{
        var customer_id = req.params.customer_id
        var customer_name = await pool.query(
            "SELECT first_name, last_name FROM customer WHERE customer_id = $1", 
            [customer_id]
        )
        console.log(customer_name.rows[0].first_name)
        var customer_fullname = `${customer_name.rows[0].first_name} ${customer_name.rows[0].last_name}`
        res.json({ customer_id, customer_fullname })
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - DELETE
 * @route - /customer/:customer_id
 * @description - Deletes Customer using the provided Customer ID
 */
app.delete('/customer/:customer_id', async(req, res) => {
    try{
        var customer_id = req.params.customer_id
        var deleted_customer = await pool.query(
            "DELETE FROM customer WHERE customer_id = $1 RETURNING *",
            [customer_id]
        )
        res.json(deleted_customer.rows)
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - GET
 * @route - /orders/:order_id
 * @description - Returns shipments associated with the given order id
 */
app.get('/orders/:order_id', async(req, res) => {
    try{
        var order_id = req.params.order_id
        var shipment_order = await pool.query(
            "SELECT * FROM shipment WHERE order_id = $1",
            [order_id]
        )
        res.json(shipment_order.rows[0])
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})

/**
 * @method - DELETE
 * @route - /orders/:order_id
 * @description - The Homepage
 */
app.delete('/orders/:order_id', async(req, res) => {
    try{
        var order_id = req.params.order_id
        var deleted_order = await pool.query(
            "DELETE FROM orders WHERE order_id = $1 RETURNING *",
            [order_id]
        )
        res.json(deleted_order.rows)
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
})


app.listen(PORT, () => {
    console.log(`App Running on Port: ${PORT}`)
})