import { customerRepository } from "../repositories/customer.repository.js";

async function listCustomers() {
    const customers = await customerRepository.getCustomers();
    return customers.rows;
}

async function findCustomerById(id) {
    const customer = await customerRepository.getCustomerById(id);
    if (customer.rowCount === 0) {
        throw { type: "not_found", message: "Customer not found." };
    }
    return customer.rows[0];
}

async function createCustomer(name, phone, cpf) {
    const existingCustomer = await customerRepository.findCustomerByCpf(cpf);
    if (existingCustomer.rowCount > 0) {
        throw { type: "conflict", message: "This CPF is already registered." };
    }
    return customerRepository.insertCustomer(name, phone, cpf);
}

export const customerService = { listCustomers, findCustomerById, createCustomer };