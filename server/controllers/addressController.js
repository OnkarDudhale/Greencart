import Address from '../models/Address.js';
export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const { address } = req.body;

        await Address.create({ ...address, userId });
        res.status(200).json({success:true, message: 'Address added successfully' });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//Get Address :/api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.userId; 
        const addresses = await Address.find({ userId }); 
        res.status(200).json({ success: true, addresses });
    } catch (error) {
        console.error('Error fetching address:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
