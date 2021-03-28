var express = require('express')
var router = express.Router()
const csv = require('csvtojson/v2')
const pool = require('../db')

/**
 * @method - GET
 * @route - /populate
 * @description - Populates the DB using CSV
 */
router.get('/populate', async(req, res) => {
    try {
        const converter = await csv()
            .fromFile('populate_db/Customer.csv')
            .then((json) => {
                return json
            })
        
        // await pool.query("INSERT INTO customer(first_name, last_name, area_name,city, state_name, pin_code ) VALUES ( 'John', 'Doe', 'Mumbai Central', 'Mumbai', 'Maharastra', 455565 );")
        converter.forEach(async(customer) => {
            try{
                // console.log(customer.first_name, parseInt(customer.pin_code), typeof(customer.first_name), typeof(customer.last_name), typeof(customer.area_name), typeof(customer.city), typeof(customer.state_name), typeof(customer.pin_code));
                const inserted_values = await pool.query(
                    "INSERT INTO customer(first_name, last_name, area_name, city, state_name, pin_code) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
                    [customer.first_name, customer.last_name, customer.area_name, customer.city, customer.state_name, parseInt(customer.pin_code)]
                )
                console.log(inserted_values.rows)
            }catch(e){
                console.log(e)
            }
        });
        res.json(converter)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

module.exports = router