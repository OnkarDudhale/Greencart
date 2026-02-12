import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ message: 'Please fill all the fields', success: false });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: 'User already exists', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',//use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',//use sameSite none in production
            maxAge: 7 * 24 * 60 * 60 * 1000//7 days,// cookie will expire in 7 days
        });
        return res.json({ message: 'User registered successfully', success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}

//Login User :api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'Please fill all the fields', success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Invalid email or password', success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: 'Invalid email or password', success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.json({ message: 'User logged in successfully', success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}


//Check if user is logged in :api/user/check-login
export const checkLogin = async (req, res) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.json({ message: 'Not authenticated', success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.json({ message: 'User not found', success: false });
        }

        return res.json({ message: 'User is logged in', success: true, user });
    } catch (error) {
        console.error('Error checking login:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}

//Logout User :api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ message: 'User logged out successfully', success: true });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.json({ message: 'Internal server error', success: false });
    }
}