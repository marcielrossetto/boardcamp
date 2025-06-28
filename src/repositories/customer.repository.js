import { db } from "../database/database.js";

function findGameByName(name) {
    return db.query(`SELECT * FROM customers;`);
}

function getCustomers() {
    return db.query(`SELECT * FROM customers;`);
}

function getCustomerById(id) {
    return db.query(`SELECT * FROM customers WHERE id=$1;`, [id]);
}

function findCustomerByCpf(cpf) {
    return db.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);
}

function insertCustomer(name, phone, cpf) {
    return db.query(
        `INSERT INTO customers (name, phone, cpf) VALUES ($1, $2, $3);`,
        [name, phone, cpf]
    );
}

export const customerRepository = { 
    getCustomers, 
    findCustomerByCpf, 
    getCustomerById,
    findGameByName,
    insertCustomer
};
