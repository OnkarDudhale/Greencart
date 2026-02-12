import React from 'react'
import { useAppContext } from '../context/appContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams();

    const searchCategory = categories.find((item) =>
        item.path.toLowerCase() === category.toLowerCase()
    )

    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase() === category.toLowerCase()
    )

    return (
        <div className='mt-16 px-4 md:px-8'>
            {searchCategory && (
                <>
                    <div className='flex flex-col items-end w-max mb-8'>
                        <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
                        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center py-8 text-gray-500'>
                            No products found in this category
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

export default ProductCategory