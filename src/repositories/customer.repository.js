import {  db } from "../database/database.js";

function findGameByName(name) {
    return db.query(`SELECT * FROM customers;`);
}

function getCostumers(){
    return db.query(`SELECT * FROM customers;`);
}
function getCustomerById(id) {
    return db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
}
function insertCustomer(name, phone, cpf){
    return db.query(
          `INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3);`,
        [name, phone, cpf]
    );
}

export const customerRepository = { getCostumers, getCustomerById,findGameByName,insertCustomer};