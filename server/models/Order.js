// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // ✅ here
            quantity: Number
        }
    ],
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    amount: Number,
    paymentType: String,
    isPaid: { type: Boolean, default: false },
    status: { type: String, default: 'Placed' }
}, { timestamps: true });


const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
