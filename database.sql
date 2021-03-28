CREATE DATABASE online_store;

-- \c into online_store
CREATE TABLE customer(
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(15) NOT NULL,
    last_name VARCHAR(15),
    area_name VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state_name VARCHAR(30) NOT NULL,
    pin_code INT NOT NULL,
);

CREATE TABLE order(
    order_id SERIAL PRIMARY KEY,
    details VARCHAR(100),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    state_name VARCHAR(30),
    pin_code INT,
    CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
      REFERENCES customer(customer_id)
      ON DELETE CASCADE
);

CREATE TABLE shipment(
    shipment_id SERIAL PRIMARY KEY,
    delivery VARCHAR(100),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
      REFERENCES customer(customer_id)
      ON DELETE CASCADE,
    CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
      REFERENCES order(order_id)
      ON DELETE CASCADE
);