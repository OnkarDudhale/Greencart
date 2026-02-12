import mongoose from "mongoose";

const connectDB = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully')
        });
        await mongoose.connect(`${process.env.MONGODB_URL}/greencart`);
    }catch(error){
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;