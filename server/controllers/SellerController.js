import jwt from 'jsonwebtoken';

//login Seller :api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (password == process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
            return res.json({ message: 'Seller logged in successfully', success: true });
        } else {
            return res.json({ message: 'Invalid email or password', success: false });
        }
    } catch (error) {
        console.error('Error logging in seller:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}

//Check if seller is logged in :api/seller/check-login

export const checkSellerLogin = async (req, res) => {
    try {
        return res.json({ message: 'Seller is logged in', success: true });
    } catch (error) {
        console.error('Error checking login:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}




//Logout Seller :api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ message: 'Seller logged out successfully', success: true });
    } catch (error) {
        console.error('Error logging out seller:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}






