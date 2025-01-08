import db from '../config/config.js';

const Purchase = db.Purchase;
const Product = db.Product;
const Bank = db.Bank;
const PurchaseDetail = db.PurchaseDetail;

export const createPurchasesDetails = async (req, res) => {
    const purchases = req.body.purchases; // Array of purchase objects
    const { bankId } = req.body; // Bank ID for all purchases
  
    try {
        // Start a transaction to ensure atomicity
        const transaction = await db.sequelize.transaction();
  
        let totalPaymentAmount = 0;
  
        try {
            // Step 1: Process each purchase in the array
            const purchaseData = []; // To store the created purchases

            for (let i = 0; i < purchases.length; i++) {
                const {
                    supplierId,
                    cost_price,
                    qty,
                    include_tax,
                    discount,
                    payment_amount,
                    sell_price, 
                } = purchases[i];
  
                // Calculate total and balance for the current purchase
                const total = cost_price * qty + (include_tax || 0);
                const total_amount = total - (discount || 0);
                const balance = total_amount - payment_amount;
  
                // Step 2: Create the purchase record
                const newPurchase = await Purchase.create(
                    {
                        supplierId,
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

                // Step 3: Process PurchaseDetails (one for each product in the purchase)
                for (let j = 0; j < purchases[i].products.length; j++) {
                    const { productId, qty, cost_price, sell_price } = purchases[i].products[j];

                    const total = cost_price * qty + (include_tax || 0);
                    const total_amount = total - (discount || 0);

                    // Step 4: Create the purchase detail record
                    await PurchaseDetail.create(
                        {
                            purchaseId: newPurchase.purchaseId, // Reference to the Purchase
                            productId,
                            cost_price,
                            qty,
                            total,
                            discount,
                            total_amount,
                            sell_price,
                        },
                        { transaction }
                    );
  
                    // Step 5: Update the product's quantity and details
                    const product = await Product.findByPk(productId, { transaction });
  
                    if (!product) {
                        throw new Error(`Product with ID ${productId} not found`);
                    }
  
                    // Update the product's quantity
                    const newQty = (product.qty || 0) + qty;
  
                    // Ensure `sell_price`, `total_amount`, and `profit` are updated
                    const newSellPrice = sell_price; // Use the provided sell price
                    const newTotalAmount = total_amount; // Set total_amount from purchase calculation
  
                    // Calculate profit as the difference between sell_price and total_amount
                    const newProfit = Math.max(newSellPrice - newTotalAmount, 0); // Prevent negative profit
  
                    // Update product's stock and calculate profit
                    await product.update(
                        {
                            qty: newQty,
                            cost_price, // Update product cost price
                            include_tax,  // Update tax inclusion
                            total_amount: newTotalAmount, // Set total_amount for the product
                            sell_price: newSellPrice,  // Set new sell price
                            profit: newProfit, // Set profit based on difference
                        },
                        { transaction }
                    );
  
                    totalPaymentAmount += payment_amount; // Add payment amount to the total payment
                }
            }
  
            // Step 6: Deduct money from the bank for all purchases
            const bank = await Bank.findByPk(bankId, { transaction });
  
            if (!bank) {
                throw new Error('Bank not found');
            }
  
            // Ensure bank has sufficient balance
            if (bank.balance < totalPaymentAmount) {
                throw new Error('Insufficient bank balance');
            }
  
            // Update the bank balance
            const newBalance = bank.balance - totalPaymentAmount;
            await bank.update({ balance: newBalance }, { transaction });
  
            // Commit the transaction to finalize changes
            await transaction.commit();
  
            res.status(201).json({
                success: true,
                message: 'Multiple purchases created successfully, and products updated dynamically',
                purchases,
            });
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            res.status(500).json({
                success: false,
                message: error.message || 'Something went wrong during purchase creation',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
        });
    }
};
