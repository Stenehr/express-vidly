const express = require("express");
const { Customer, validateCustomer } = require('../models/customer');
const { successResult, failureResult } = require("../utils");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find().sort({ name: 1 });

        return res.status(200).json(successResult(customers));
    } catch (ex) {
        return res.status(400).json(failureResult(ex.message));
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json(failureResult("Customer not found"));

        return res.status(200).json(successResult(customer));
    } catch (ex) {
        return res.status(400).json(failureResult(ex.message));
    }
});

router.post("/", async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(failureResult(error.details[0].message));

    try {
        const { isGold, name, phone } = req.body;
        let customer = new Customer({
            isGold,
            name,
            phone
        });

        customer = await customer.save();

        return res.status(200).json(successResult(customer));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

router.put("/:id", async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).json(failureResult(error.details[0].message));

    try {
        const { isGold, name, phone } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    isGold,
                    name,
                    phone
                }
            },
            { new: true }
        );

        return res.status(200).json(successResult(customer));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const course = await Customer.findByIdAndRemove(req.params.id);

        return res.status(200).json(successResult(course));
    } catch (ex) {
        return res.status(404).json(failureResult(ex.message));
    }
});

module.exports = router;
