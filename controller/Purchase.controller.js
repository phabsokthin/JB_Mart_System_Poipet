import { Sequelize, where } from 'sequelize';
import db from '../config/config.js';

const Purchase = db.Purchase;
const Product = db.Product;
const Bank = db.Bank;


export const fetchPurchaseByPurchaseNo = async (req, res) => {
    try {
        const data = await Purchase.findAll({
            where: {
                purchaseNo: req.params.id, // Ensure this matches your parameter name
            },
            include: [
                {
                    model: db.Bank,
                    as: 'bankId_for_purchase',
                    attributes: ['bankName']
                },
                {
                    model: db.Supplier,
                    as: 'supplierId_for_purchase',
                    attributes: ['full_Name']
                },
                {
                    model: db.Product,
                    as: 'productId_for_purchase',
                    attributes: ['pname']
                },
                {
                    model: db.User,
                    as: 'userId_for_purchase',
                    attributes: ['userName']
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        if (!data) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching the purchase' });
    }
};



export const fetchPurchase = async (req, res) => {
    try {
        const data = await db.Purchase.findAll({
            attributes: [
                'purchaseNo',
                'supplierId',
                'bankId',
                "date_purchase",
                [Sequelize.fn('SUM', Sequelize.col('Purchase.total_amount')), 'total_amount'],
                [Sequelize.fn('SUM', Sequelize.col('Purchase.payment_amount')), 'payment_amount'],
                [Sequelize.fn('SUM', Sequelize.col('Purchase.balance')), 'balance'],
            ],
            include: [
                {
                    model: db.Supplier,
                    as: 'supplierId_for_purchase',
                    attributes: ['full_Name'], // Supplier's name
                },
                {
                    model: db.User,
                    as: 'userId_for_purchase',
                    attributes: ['userName'], // User's name
                },
                {
                    model: db.Bank,
                    as: 'bankId_for_purchase',
                    attributes: ['bankName'], // Bank's name
                }
            ],
            group: [
                'purchaseNo',
                'supplierId',
                'bankId',
                "date_purchase",
                'supplierId_for_purchase.supplierId', // Ensure grouping on the primary key of related models
                'supplierId_for_purchase.full_Name',
                'userId_for_purchase.userId',
                'userId_for_purchase.userName',
                'bankId_for_purchase.bankId',
                'bankId_for_purchase.bankName',
            ],
            order: [['purchaseNo', 'DESC']],
        });
        

        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching purchases.' });
    }
};




export const createPurchases = async (req, res) => {
    const purchases = req.body.purchases; // Assuming 'purchases' is an array of purchase objects
    const { bankId, userId, total_amount, balance, payment_amount, discount } = req.body;

    try {
        // Start a transaction to ensure atomicity
        const transaction = await db.sequelize.transaction();

        let totalPaymentAmount = 0;

        try {
            // Step 1: Check if the bank is enabled
            const bank = await Bank.findByPk(bankId, { transaction });

            if (!bank) {
                throw new Error('Bank not found');
            }

            if (bank.status === 0) {
                throw new Error('គណនីនេះបានបិទបណ្តោះអាសន្នហើយ។');
            }

            // Step 2: Generate a new purchaseNo for all purchases
            const latestPurchase = await Purchase.findOne({
                order: [['purchaseNo', 'DESC']],
                attributes: ['purchaseNo'],
                transaction,
            });

            const purchaseNo = latestPurchase ? latestPurchase.purchaseNo + 1 : 1; // Start with 1 if no previous purchase found

            // Step 3: Process each purchase item in the array
            for (let i = 0; i < purchases.length; i++) {
                const {
                    supplierId,
                    productId,
                    cost_price,
                    qty,
                    include_tax,
                    // discount,
                    // payment_amount,
                    sell_price, // New sell_price field
                } = purchases[i];

                // Step 4: Check the product's status before processing
                const product = await Product.findByPk(productId, { transaction });

                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }

                // Prevent creating purchases if product.status === false
                if (product.status === false) {
                    throw new Error(
                        `មិនអាចទិញផលិតផល ${product.pname} ទេ។ ដោយសារផលិតផលនេះមិនគ្រប់គ្រងស្តុកទេ។`
                    );
                }

                // Calculate total and balance for the current purchase
                const total = cost_price * qty + (include_tax || 0);
                const total_amounts = total - (discount || 0);
                const balances = total_amounts - payment_amount;

                // Step 5: Create the purchase record (use the same purchaseNo for all items)
                await Purchase.create(
                    {
                        purchaseNo, // Use the generated purchaseNo
                        supplierId,
                        productId,
                        cost_price,
                        qty,
                        include_tax,
                        total,
                        total_amount,
                        discount,
                        payment_amount,
                        balance,
                        bankId,
                        sell_price,
                        date_purchase: new Date(),
                        userId
                    },
                    { transaction }
                );

                // Step 6: Update the product details and stock
                const newQty = (product.qty || 0) + qty;

                const newSellPrice = sell_price;
                const newTotalAmount = total_amounts; // Set total_amounts to the purchase total_amounts

                const newProfit = newSellPrice - newTotalAmount; // Recalculate profit

                // Update the product with the new stock and calculate profit
                await product.update(
                    {
                        qty: newQty, // Update the product quantity
                        const_price: cost_price, // Update the cost_price to match the purchase
                        include_tax, // Update include_tax to match the purchase
                        total_amounts: newTotalAmount, // Update total_amounts
                        sell_price: newSellPrice, // Update sell_price from the purchase request
                        profit: newProfit, // Recalculate profit based on total_amounts - sell_price
                    },
                    { transaction }
                );

                totalPaymentAmount += payment_amount;
            }

            // Step 7: Deduct money from the bank balance for all purchases
            if (bank.balance < payment_amount) {
                throw new Error('មិនមានសាច់ប្រាក់គ្រប់គ្រាន់សម្រាប់ការទូរទាត់ទេ');
            }

            const newBalance = bank.balance - payment_amount;
            await bank.update({ balance: newBalance }, { transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(201).json({
                message: 'Multiple purchases created successfully and products updated dynamically',
                purchases,
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        });
    }
};










// export const updatePurchase = async (req, res) => {
//     const { purchases, bankId } = req.body;

//     if (!Array.isArray(purchases) || purchases.length === 0) {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid purchases data. Provide a non-empty array.',
//         });
//     }

//     try {
//         const transaction = await db.sequelize.transaction();

//         try {
//             let totalBankAdjustment = 0;

//             // Fetch the bank record
//             const bank = await Bank.findByPk(bankId, { transaction });
//             if (!bank) {
//                 throw new Error('Bank not found');
//             }

//             // Check if the bank's status is inactive (0)
//             if (bank.status === 0) {
//                 throw new Error('Cannot update purchases because the bank is inactive.');
//             }

//             for (const purchaseData of purchases) {
//                 const {
//                     purchaseNo,
//                     supplierId,
//                     productId,
//                     cost_price,
//                     qty, // New quantity
//                     include_tax,
//                     discount,
//                     payment_amount,
//                     sell_price,
//                 } = purchaseData;

//                 if (qty == null || cost_price == null || productId == null) {
//                     throw new Error(`Invalid input data for Purchase No: ${purchaseNo}`);
//                 }

//                 console.log(`Processing Purchase No: ${purchaseNo}`);

//                 const purchase = await Purchase.findOne({ where: { purchaseNo }, transaction });
//                 if (!purchase) {
//                     throw new Error(`Purchase with ID ${purchaseNo} not found`);
//                 }

//                 const product = await Product.findByPk(productId, { transaction });
//                 if (!product) {
//                     throw new Error(`Product with ID ${productId} not found`);
//                 }

//                 // Calculate the stock difference
//                 const stockDifference = qty - purchase.qty;
//                 console.log(`Stock Difference: ${stockDifference}`);

//                 // Ensure that the stock does not go below 0
//                 if (stockDifference < 0 && product.qty + stockDifference < 0) {
//                     throw new Error(
//                         `Insufficient stock for Product ID: ${productId}. Cannot reduce stock below 0.`
//                     );
//                 }

//                 // Update the product stock
//                 if (stockDifference !== 0) {
//                     console.log(`Updating stock for Product ID: ${productId} with Stock Difference: ${stockDifference}`);
//                     product.qty += stockDifference;
//                     await product.save({ transaction });
//                 }

//                 // Calculate totals and balance
//                 const total = cost_price * qty + (include_tax || 0);
//                 const total_amounts = total - (discount || 0);
//                 const balance = total_amounts - payment_amount;

//                 // Calculate payment adjustment
//                 const previousPaymentAmount = purchase.payment_amount;
//                 const paymentAdjustment = payment_amount - previousPaymentAmount;

//                 // Adjust bank balance based on payment adjustment
//                 totalBankAdjustment += paymentAdjustment;

//                 // Update the purchase record
//                 await purchase.update(
//                     {
//                         supplierId,
//                         productId,
//                         cost_price,
//                         qty,
//                         include_tax,
//                         total,
//                         discount,
//                         total_amounts,
//                         payment_amount,
//                         balance,
//                         bankId,
//                         date_purchase: new Date(),
//                         userId: req.user?.id || null,
//                     },
//                     { transaction }
//                 );

//                 console.log(`Purchase updated successfully for Purchase No: ${purchaseNo}`);
//             }

//             // Adjust the bank balance
//             const newBalance = bank.balance - totalBankAdjustment;
//             if (newBalance < 0) {
//                 throw new Error('Insufficient bank balance after adjustments');
//             }

//             await bank.update({ balance: newBalance }, { transaction });

//             // Commit the transaction
//             await transaction.commit();

//             res.status(200).json({
//                 success: true,
//                 message: 'Purchases updated successfully, and bank balance adjusted',
//             });
//         } catch (error) {
//             // Rollback the transaction in case of error
//             await transaction.rollback();
//             console.error(`Transaction rolled back due to error: ${error.message}`);
//             throw error;
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Something went wrong',
//         });
//     }
// };


export const updatePurchase = async (req, res) => {
    const { purchases, bankId } = req.body;

    if (!Array.isArray(purchases) || purchases.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid purchases data. Provide a non-empty array.',
        });
    }

    try {
        const transaction = await db.sequelize.transaction();

        try {
            let totalBankAdjustment = 0;

            // Fetch the bank record
            const bank = await Bank.findByPk(bankId, { transaction });
            if (!bank) {
                throw new Error('Bank not found');
            }

            // Check if the bank's status is inactive (0)
            if (bank.status === 0) {
                throw new Error('Cannot update purchases because the bank is inactive.');
            }

            for (const purchaseData of purchases) {
                const {
                    purchaseNo,
                    supplierId,
                    productId,
                    cost_price,
                    qty, // New quantity
                    include_tax,
                    discount,
                    payment_amount,
                    sell_price, // New sell price (now we'll update it in the Product table as well)
                } = purchaseData;

                if (qty == null || cost_price == null || productId == null || sell_price == null) {
                    throw new Error(`Invalid input data for Purchase No: ${purchaseNo}`);
                }

                console.log(`Processing Purchase No: ${purchaseNo}`);

                const purchase = await Purchase.findOne({ where: { purchaseNo }, transaction });
                if (!purchase) {
                    throw new Error(`Purchase with ID ${purchaseNo} not found`);
                }

                const product = await Product.findByPk(productId, { transaction });
                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }

                // Calculate the stock difference
                const stockDifference = qty - purchase.qty;
                console.log(`Stock Difference: ${stockDifference}`);

                // Ensure that the stock does not go below 0
                if (stockDifference < 0 && product.qty + stockDifference < 0) {
                    throw new Error(
                        `Insufficient stock for Product ID: ${productId}. Cannot reduce stock below 0.`
                    );
                }

                // Update the product stock
                if (stockDifference !== 0) {
                    console.log(`Updating stock for Product ID: ${productId} with Stock Difference: ${stockDifference}`);
                    product.qty += stockDifference;
                }

                // Calculate the total amount based on cost price, quantity, tax, and discount
                const total = cost_price * qty + (include_tax || 0);  // Add tax
                const total_amounts = total - (discount || 0);  // Subtract discount

                console.log(`Total amount for Product ID: ${productId}: ${total_amounts}`);

                // Save product updates (now including the sell_price)
                product.sell_price = sell_price; // Update sell_price as well
                await product.save({ transaction }).catch((error) => {
                    throw new Error(`Failed to save product updates for Product ID: ${productId}: ${error.message}`);
                });

                // Calculate balance
                const balance = total_amounts - payment_amount;

                // Calculate profit per unit and total profit
                const profit_per_unit = sell_price - cost_price;  // Correct profit calculation per unit
                const total_profit = profit_per_unit * qty;

                // Update the product's profit field
                console.log(`Updating profit for Product ID: ${productId} to ${total_profit}`);
                product.profit = total_profit; // Update the profit on the product

                // Calculate payment adjustment
                const previousPaymentAmount = purchase.payment_amount;
                const paymentAdjustment = payment_amount - previousPaymentAmount;

                // Adjust bank balance based on payment adjustment
                totalBankAdjustment += paymentAdjustment;

                // Update the purchase record
                await purchase.update(
                    {
                        supplierId,
                        productId,
                        cost_price,
                        qty,
                        include_tax,
                        total,
                        discount,
                        total_amounts,
                        payment_amount,
                        balance,
                        bankId,
                        date_purchase: new Date(),
                        userId: req.user?.id || null,
                    },
                    { transaction }
                );

                console.log(`Purchase updated successfully for Purchase No: ${purchaseNo}`);
            }

            // Adjust the bank balance
            const newBalance = bank.balance - totalBankAdjustment;
            if (newBalance < 0) {
                throw new Error('Insufficient bank balance after adjustments');
            }

            await bank.update({ balance: newBalance }, { transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(200).json({
                success: true,
                message: 'Purchases updated successfully, and bank balance adjusted',
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            console.error(`Transaction rolled back due to error: ${error.message}`);
            throw error;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        });
    }
};





// export const deletePurchase = async (req, res) => {
//     const { purchaseNo, bankId } = req.body;

//     if (!purchaseNo || !bankId) {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid request. Provide purchaseNo and bankId.',
//         });
//     }

//     try {
//         const transaction = await db.sequelize.transaction();

//         try {
//             // Fetch the purchase record
//             const purchase = await Purchase.findOne({ where: { purchaseNo }, transaction });
//             if (!purchase) {
//                 throw new Error('Purchase not found.');
//             }

//             // Fetch the related product
//             const product = await Product.findByPk(purchase.productId, { transaction });
//             if (!product) {
//                 throw new Error('Product not found.');
//             }

//             // Fetch the bank record
//             const bank = await Bank.findByPk(bankId, { transaction });
//             if (!bank) {
//                 throw new Error('Bank not found.');
//             }

//             // Check if the bank's status is inactive (0)
//             if (bank.status === 0) {
//                 throw new Error('Cannot delete purchase because the bank is inactive.');
//             }

//             // Adjust the stock by decreasing the purchased quantity
//             console.log(`Decreasing stock for Product ID: ${product.id} by ${purchase.qty}`);
//             product.qty -= purchase.qty;
//             if (product.qty < 0) {
//                 throw new Error('Insufficient stock for the product after deletion.');
//             }
//             await product.save({ transaction });

//             // Adjust the bank balance
//             console.log(`Adjusting bank balance for Bank ID: ${bank.id}`);
//             const newBalance = bank.balance + purchase.payment_amount;

//             if (newBalance < 0) {
//                 throw new Error('Insufficient bank balance after adjustments.');
//             }

//             await bank.update({ balance: newBalance }, { transaction });

//             // Delete the purchase record
//             console.log(`Deleting purchase with Purchase No: ${purchaseNo}`);
//             await purchase.destroy({ transaction });

//             // Commit the transaction
//             await transaction.commit();

//             res.status(200).json({
//                 success: true,
//                 message: 'Purchase deleted successfully, and related adjustments made.',
//             });
//         } catch (error) {
//             // Rollback the transaction in case of error
//             await transaction.rollback();
//             console.error(`Transaction rolled back due to error: ${error.message}`);
//             throw error;
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Something went wrong.',
//         });
//     }
// };




export const deletePurchase = async (req, res) => {
    const { purchaseNo, bankId } = req.body;

    if (!purchaseNo || !bankId) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request. Provide purchaseNo and bankId.',
        });
    }

    try {
        const transaction = await db.sequelize.transaction();

        try {
            // Fetch all purchases with the given purchaseNo
            const purchases = await Purchase.findAll({ where: { purchaseNo }, transaction });
            const purchase = await Purchase.findOne({ where: { purchaseNo }, transaction });

            if (!purchases || purchases.length === 0) {
                throw new Error('Purchases not found.');
            }

            // Fetch the related bank record
            const bank = await Bank.findByPk(bankId, { transaction });
            if (!bank) {
                throw new Error('Bank not found.');
            }

            // Check if the bank's status is inactive (0)
            if (bank.status === 0) {
                throw new Error('Cannot delete purchase because the bank is inactive.');
            }

            // Variable to track the total adjustment to the bank balance
            let totalAdjustment = 0;

            // Loop through each purchase and adjust the stock and bank balance
            for (let i = 0; i < purchases.length; i++) {
                const purchase = purchases[i];

                // Fetch the related product
                const product = await Product.findByPk(purchase.productId, { transaction });
                if (!product) {
                    throw new Error(`Product with ID ${purchase.productId} not found.`);
                }

                // Adjust the stock by decreasing the purchased quantity
                console.log(`Decreasing stock for Product ID: ${product.id} by ${purchase.qty}`);
                product.qty -= purchase.qty; // Revert the quantity added during purchase
                if (product.qty < 0) {
                    throw new Error('Insufficient stock for the product after deletion.');
                }
                await product.save({ transaction });

                // Accumulate the adjustment for the bank balance
         

                // Delete the individual purchase record
                console.log(`Deleting purchase with Purchase No: ${purchaseNo}`);
                await purchase.destroy({ transaction });
            }

            // Adjust the bank balance once after the loop
            console.log(`Adjusting bank balance for Bank ID: ${bank.id}`);
            const newBalance = bank.balance + purchase.payment_amount ;

            if (newBalance < 0) {
                throw new Error('Insufficient bank balance after adjustments.');
            }

            await bank.update({ balance: newBalance }, { transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(200).json({
                success: true,
                message: 'Purchases deleted successfully, and related adjustments made.',
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            console.error(`Transaction rolled back due to error: ${error.message}`);
            throw error;
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong.',
        });
    }
};
