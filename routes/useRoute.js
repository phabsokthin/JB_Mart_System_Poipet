import express, { Router } from 'express';
import {register, login, logout} from '../controller/User.controller.js'
import { refresh } from '../token/refreshToken.js';
import { createSupplier, deleteSpplier, fetchSupplier, fetchSupplierByID, updateSupplier } from '../controller/Supplier.controller.js';
import { createCustomer, deleteCustomer, fetchCutomer, fetchCutomerByID, updateCustomer } from '../controller/Customer.controller.js';
import { createCategory, deleteCategory, fetchCategory, fetchCategoryByID, updateCategory } from '../controller/Category.controller.js';
import { createUnit, deleteUnit, fetchUnit, fetchUnitByID, updateUnit } from '../controller/Units.controller.js';
import { createBrand, deleteBrand, fetchBrand, fetchBrandByID, updateBrand } from '../controller/Brand.controller.js';

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


//category

router.get('/category', fetchCategory)
router.post('/category', createCategory)
router.get('/category/:id', fetchCategoryByID)
router.delete('/category/:id', deleteCategory)
router.put('/category/:id', updateCategory)

// unit

router.get('/unit', fetchUnit)
router.post('/unit', createUnit)
router.get('/unit/:id', fetchUnitByID)
router.delete('/unit/:id', deleteUnit)
router.put('/unit/:id', updateUnit)

//brand

router.get('/brand', fetchBrand)
router.post('/brand', createBrand)
router.get('/brand/:id', fetchBrandByID)
router.delete('/brand/:id', deleteBrand)
router.put('/brand/:id', updateBrand)


export default router;
