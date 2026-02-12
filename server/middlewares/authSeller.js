import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;
        if (!sellerToken) {
            return res.json({ message: 'Unauthorized', success: false });
        }
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET.trim());
        if (decoded.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ message: 'Unauthorized', success: false });
        }
    } catch (error) {
        console.error('Error in authSeller middleware:', error);
        res.json({ message: 'Unauthorized', success: false });
    }
}
export default authSeller;