//update user cart data :/api/cart/update
import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
        return res.status(200).json({ success: true, message: 'Cart updated successfully' });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Error while updating cart' });
    }
}