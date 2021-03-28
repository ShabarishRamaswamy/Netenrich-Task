CREATE DATABASE online_store;

-- \c into online_store
CREATE TABLE customer(
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15),
    area_name VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state_name VARCHAR(30) NOT NULL,
    pin_code INT NOT NULL
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    details VARCHAR(100),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
	customer_id INT,
    CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
      REFERENCES customer(customer_id)
      ON DELETE CASCADE
);

CREATE TABLE shipment(
    shipment_id SERIAL PRIMARY KEY,
	customer_id INT,
	order_id INT,
    delivery VARCHAR(100),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
      REFERENCES customer(customer_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
      REFERENCES orders(order_id)
      ON DELETE CASCADE
);

-- Intersion Statements

INSERT INTO customer(
	first_name, 
	last_name,
	area_name,
	city,
	state_name,
	pin_code
) VALUES (
	'John',
	'Doe',
	'Mumbai Central',
	'Mumbai',
	'Maharastra',
	455565
);

INSERT INTO orders(
	details, 
	date,
    customer_id
) VALUES (
    'Android Phone',
    '2021-03-25',
    1
);


INSERT INTO shipment(
	customer_id, 
	order_id,
    delivery
) VALUES (
    1,
    1,
    'On the go.'
);