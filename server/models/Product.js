import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, default: 0 },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

// ✅ Capitalized model name must match 'ref' used in populate()
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
