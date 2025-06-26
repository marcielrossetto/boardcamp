import { customerRepository } from "../repositories/customer.repository.js";

async function listCustomer() {
    const customers = await customerRepository.getCostumers();
    return customers.rows;
}

async function findCostumerById(id) {
    const customer = await customerRepository.getCustomersById(id);
    if (customerRepository.rowCount === 0){
        throw { type: "Not_found", message: "Customer Not Found." };
    }
    return customer.rows[0];
}

async function createCustomer(name, phone, cpf){
    const existingCustomer = await customerRepository.findGameByCpf(cpf);
    if (existingCustomer.rowCownt > 0) {
        throw { type: "comflict", message: " This CPF is already registred." };
    }
    return customerRepository.insertCustomer(name, phone, cpf);
}
export const customerService = { listCustomer, findCostumerById, createCustomer};