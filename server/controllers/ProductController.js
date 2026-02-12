import Product from "../models/Product.js";
import { v2 as cloudinary} from "cloudinary";

// Import the Product model
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files;
        const imageUrls = await Promise.all(
            images.map(async (item) => {
               let result=await cloudinary.uploader.upload(item.path, {resource_type:'image'});
               return result.secure_url;
            })
        )
        await Product.create({...productData, image:imageUrls});
        res.json({success:true,message:'Product added successfully'});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error while adding product'});
    }
}

// This function is used to get all products from the database
export const productList=async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({success:true,products});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error while fetching products'});
    }
}

// This function is used to get a single product by its ID from the database
export const productById = async (req, res) => {
    try {
        const {id}=req.body;    
        const product = await Product.findById(id);
        res.json({success:true,product});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error while fetching product'});
    }
}

// This function is used to update a product by its ID in the database
export const changeStock = async (req, res) => {   
    try {
        const {id, inStock} = req.body;
        const product = await Product.findByIdAndUpdate(id, {inStock}, {new:true});
        res.json({success:true,product});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error while updating product'});
    }
}