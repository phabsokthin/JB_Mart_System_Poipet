import express from 'express';
import {register, login, logout} from '../controller/User.controller.js'
import { refresh } from '../token/refreshToken.js';
import { createSupplier, deleteSpplier, fetchSupplier, fetchSupplierByID, updateSupplier } from '../controller/Supplier.controller.js';
import { createCustomer, deleteCustomer, fetchCutomer, fetchCutomerByID, updateCustomer } from '../controller/Customer.controller.js';

const router = express.Router();

//register

router.get("/register", (req, res) =>{
    res.send("Hello")
})
router.post('/register', register )
router.post('/login', login)
router.delete('/logout', logout)
 
//totken 
router.get('/token', refresh)

//supplier
router.post('/supplier', createSupplier)
router.get("/supplier", fetchSupplier)
router.get("/supplier/:id", fetchSupplierByID)
router.delete("/supplier/:id", deleteSpplier)
router.put("/supplier/:id", updateSupplier)

//customer
router.get('/customer', fetchCutomer)
router.post('/customer', createCustomer)
router.get('/customer/:id', fetchCutomerByID)
router.delete('/customer/:id', deleteCustomer)
router.put('/customer/:id', updateCustomer)


export default router;
