import { customerService } from "../services/customer.service.js";

export async function getCustomers(req, res) {
    const customers = await customerService.listCustomers();
    res.send(customers);
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    const customer = await customerService.findCustomerById(id);
    res.send(customer);
}

export async function postCustomer(req, res) {
    const { name, phone, cpf } = req.body;
    await customerService.createCustomer(name, phone, cpf);
    res.sendStatus(201);
}