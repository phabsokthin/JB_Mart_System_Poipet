import { where } from 'sequelize';
import db from '../config/config.js';

const Purchase = db.Purchase;
const Product = db.Product;
const Bank = db.Bank;

export const fetchPurchase = async (req, res) => {
    const { id } = req.params; // Get supplierId from request parameters

    try {
        // Fetch all purchases for the specific supplier
        const purchases = await Purchase.findAll({
            where: {
                purchaseNo: id,
            },
        });

        if (!purchases || purchases.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No purchases found for supplier with ID ${supplierId}`,
            });
        }

        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error retrieving purchases',
        });
    }
};


// export const createPurchases = async (req, res) => {
//     const purchases = req.body.purchases; // Assuming 'purchases' is an array of purchase objects
//     const { bankId } = req.body; // Bank ID remains the same for all purchases

//     try {
//         // Start a transaction to ensure atomicity
//         const transaction = await db.sequelize.transaction();

//         let totalPaymentAmount = 0;

//         try {
//             // Step 1: Generate a new purchaseNo for all purchases
//             const latestPurchase = await Purchase.findOne({
//                 order: [['purchaseNo', 'DESC']],
//                 attributes: ['purchaseNo'],
//                 transaction,
//             });

//             const purchaseNo = latestPurchase ? latestPurchase.purchaseNo + 1 : 1; // Start with 1 if no previous purchase found

//             // Step 2: Process each purchase item in the array
//             for (let i = 0; i < purchases.length; i++) {
//                 const {
//                     supplierId,
//                     productId,
//                     cost_price,
//                     qty,
//                     include_tax,
//                     discount,
//                     payment_amount,
//                     sell_price, // New sell_price field
//                 } = purchases[i];

//                 // Step 3: Check the product's status before processing
//                 const product = await Product.findByPk(productId, { transaction });

//                 if (!product) {
//                     throw new Error(`Product with ID ${productId} not found`);
//                 }

//                 // Check if the product's status is 0 (not managed in stock)
//                 if (product.status === false) {
//                     throw new Error(
//                         `Product with ID ${productId} cannot be added to purchases as it is not managed in stock.`
//                     );
//                 }

//                 // Calculate total and balance for the current purchase
//                 const total = cost_price * qty + (include_tax || 0);
//                 const total_amount = total - (discount || 0);
//                 const balance = total_amount - payment_amount;

//                 // Step 4: Create the purchase record (use the same purchaseNo for all items)
//                 await Purchase.create(
//                     {
//                         purchaseNo, // Use the generated purchaseNo
//                         supplierId,
//                         productId,
//                         cost_price,
//                         qty,
//                         include_tax,
//                         total,
//                         discount,
//                         total_amount,
//                         payment_amount,
//                         balance,
//                         bankId,
//                         date_purchase: new Date(),
//                         userId: req.user?.id || null,
//                     },
//                     { transaction }
//                 );

//                 // Step 5: Update the product details and stock
//                 const newQty = (product.qty || 0) + qty;

//                 const newSellPrice = sell_price;
//                 const newTotalAmount = total_amount; // Set total_amount to the purchase total_amount

//                 const newProfit = Math.max(newSellPrice - newTotalAmount, 0); // Recalculate profit

//                 // Update the product with the new stock and calculate profit
//                 await product.update(
//                     {
//                         qty: newQty, // Update the product quantity
//                         const_price: cost_price, // Update the cost_price to match the purchase
//                         include_tax, // Update include_tax to match the purchase
//                         total_amount: newTotalAmount, // Update total_amount
//                         sell_price: newSellPrice, // Update sell_price from the purchase request
//                         profit: newProfit, // Recalculate profit based on total_amount - sell_price
//                     },
//                     { transaction }
//                 );

//                 totalPaymentAmount += payment_amount;
//             }

//             // Step 6: Deduct money from the bank balance for all purchases
//             const bank = await Bank.findByPk(bankId, { transaction });

//             if (!bank) {
//                 throw new Error('Bank not found');
//             }

//             if (bank.balance < totalPaymentAmount) {
//                 throw new Error('Insufficient bank balance');
//             }

//             const newBalance = bank.balance - totalPaymentAmount;
//             await bank.update({ balance: newBalance }, { transaction });

//             // Commit the transaction
//             await transaction.commit();

//             res.status(201).json({
//                 success: true,
//                 message: 'Multiple purchases created successfully and products updated dynamically',
//                 purchases,
//             });
//         } catch (error) {
//             // Rollback the transaction in case of error
//             await transaction.rollback();
//             throw error;
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message || 'Something went wrong',
//         });
//     }
// };



export const createPurchases = async (req, res) => {
    const purchases = req.body.purchases; // Assuming 'purchases' is an array of purchase objects
    const { bankId } = req.body; // Bank ID remains the same for all purchases

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
                throw new Error('Cannot create purchases. The bank is disabled.');
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
                    discount,
                    payment_amount,
                    sell_price, // New sell_price field
                } = purchases[i];

                // Step 4: Check the product's status before processing
                const product = await Product.findByPk(productId, { transaction });

                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }

                // Check if the product's status is 0 (not managed in stock)
                if (product.status === false) {
                    throw new Error(
                        `Product with ID ${productId} cannot be added to purchases as it is not managed in stock.`
                    );
                }

                // Calculate total and balance for the current purchase
                const total = cost_price * qty + (include_tax || 0);
                const total_amount = total - (discount || 0);
                const balance = total_amount - payment_amount;

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
                        discount,
                        total_amount,
                        payment_amount,
                        balance,
                        bankId,
                        date_purchase: new Date(),
                        userId: req.user?.id || null,
                    },
                    { transaction }
                );

                // Step 6: Update the product details and stock
                const newQty = (product.qty || 0) + qty;

                const newSellPrice = sell_price;
                const newTotalAmount = total_amount; // Set total_amount to the purchase total_amount

                const newProfit = Math.max(newSellPrice - newTotalAmount, 0); // Recalculate profit

                // Update the product with the new stock and calculate profit
                await product.update(
                    {
                        qty: newQty, // Update the product quantity
                        const_price: cost_price, // Update the cost_price to match the purchase
                        include_tax, // Update include_tax to match the purchase
                        total_amount: newTotalAmount, // Update total_amount
                        sell_price: newSellPrice, // Update sell_price from the purchase request
                        profit: newProfit, // Recalculate profit based on total_amount - sell_price
                    },
                    { transaction }
                );

                totalPaymentAmount += payment_amount;
            }

            // Step 7: Deduct money from the bank balance for all purchases
            if (bank.balance < totalPaymentAmount) {
                throw new Error('Insufficient bank balance');
            }

            const newBalance = bank.balance - totalPaymentAmount;
            await bank.update({ balance: newBalance }, { transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(201).json({
                success: true,
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
//             for (let i = 0; i < purchases.length; i++) {
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
//                 } = purchases[i];

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

//                 // Update the product stock based on stock difference
//                 if (stockDifference !== 0) {
//                     console.log(`Updating stock for Product ID: ${productId} with Stock Difference: ${stockDifference}`);
//                     product.qty += stockDifference; // Update the stock (increase or decrease)
//                     await product.save({ transaction });
//                 }

//                 // Calculate totals and balance
//                 const total = cost_price * qty + (include_tax || 0);
//                 const total_amount = total - (discount || 0);
//                 const balance = total_amount - payment_amount;

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
//                         total_amount,
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

//             // Commit the transaction
//             await transaction.commit();

//             res.status(200).json({
//                 success: true,
//                 message: 'Purchases updated successfully',
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
//                 const total_amount = total - (discount || 0);
//                 const balance = total_amount - payment_amount;

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
//                         total_amount,
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
//             const bank = await Bank.findByPk(bankId, { transaction });
//             if (!bank) {
//                 throw new Error('Bank not found');
//             }

//             // Deduct or add the total bank adjustment
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
                    sell_price,
                } = purchaseData;

                if (qty == null || cost_price == null || productId == null) {
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
                    await product.save({ transaction });
                }

                // Calculate totals and balance
                const total = cost_price * qty + (include_tax || 0);
                const total_amount = total - (discount || 0);
                const balance = total_amount - payment_amount;

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
                        total_amount,
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
            // Fetch the purchase record
            const purchase = await Purchase.findOne({ where: { purchaseNo }, transaction });
            if (!purchase) {
                throw new Error('Purchase not found.');
            }

            // Fetch the related product
            const product = await Product.findByPk(purchase.productId, { transaction });
            if (!product) {
                throw new Error('Product not found.');
            }

            // Fetch the bank record
            const bank = await Bank.findByPk(bankId, { transaction });
            if (!bank) {
                throw new Error('Bank not found.');
            }

            // Check if the bank's status is inactive (0)
            if (bank.status === 0) {
                throw new Error('Cannot delete purchase because the bank is inactive.');
            }

            // Adjust the stock by decreasing the purchased quantity
            console.log(`Decreasing stock for Product ID: ${product.id} by ${purchase.qty}`);
            product.qty -= purchase.qty;
            if (product.qty < 0) {
                throw new Error('Insufficient stock for the product after deletion.');
            }
            await product.save({ transaction });

            // Adjust the bank balance
            console.log(`Adjusting bank balance for Bank ID: ${bank.id}`);
            const newBalance = bank.balance + purchase.payment_amount;

            if (newBalance < 0) {
                throw new Error('Insufficient bank balance after adjustments.');
            }

            await bank.update({ balance: newBalance }, { transaction });

            // Delete the purchase record
            console.log(`Deleting purchase with Purchase No: ${purchaseNo}`);
            await purchase.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();

            res.status(200).json({
                success: true,
                message: 'Purchase deleted successfully, and related adjustments made.',
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




