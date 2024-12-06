import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import User from '../models/Users.js';
import Customer from '../models/Customers.js';
import Supplier from '../models/Suppliers.js';
import Category from '../models/Categories.js';
import Unit from '../models/Units.js';
import Brand from '../models/Brands.js';
import Product from '../models/Products.js';
import Purchase from '../models/Purchases.js';
import Currency from '../models/Currencies.js';
import PaymentMethod from '../models/PaymentMothods.js';
import Bank from '../models/Banks.js';
import BankType from '../models/BankType.js';
import BankTransfer from '../models/BankTransfer.js';
import ExpenseType from '../models/ExpenseTypes.js';
import Expense from '../models/Expenses.js';
import Sell from '../models/Sells.js';
import SellReturn from '../models/SellReturns.js';

const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbhost = process.env.DB_HOST;

const dbPort = process.env.DB_PORT || 8080; 

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
    host: dbhost,
    dialect: 'mysql',
    port: dbPort,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = User(sequelize);
db.Customer = Customer(sequelize)
db.Supplier = Supplier(sequelize)
db.Category = Category(sequelize)
db.Unit = Unit(sequelize)
db.Brand = Brand(sequelize)
db.Product = Product(sequelize)
db.Purchase = Purchase(sequelize)
db.Currency = Currency(sequelize)
db.PaymentMethod = PaymentMethod(sequelize)
db.Bank = Bank(sequelize)
db.BankType = BankType(sequelize)
db.BankTransfer = BankTransfer(sequelize)
db.ExpenseType = ExpenseType(sequelize)
db.Expense = Expense(sequelize)
db.Sell = Sell(sequelize)
db.SaleReturn = SellReturn(sequelize)


// Check connection success
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connected successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error.message);
//     }
// })();


export default db;
