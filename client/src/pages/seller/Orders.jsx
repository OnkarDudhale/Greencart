import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/appContext';
import { dummyOrders } from '../../assets/assets';

const Orders = () => {
    const { currency ,axios} = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const {data}=await axios.get('/api/order/seller');
            if(data.success){
                setOrders(data.orders)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className='no-scrollbar flex-1 min-h-[95vh] overflow-y-auto bg-gray-50'>
            <div className="md:p-8 p-4 space-y-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>

                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        {/* Product Info */}
                        <div className="flex gap-4 flex-1 min-w-[250px]">
                            <div className="flex-shrink-0">
                                <img
                                    className="w-14 h-14 object-contain p-1 border border-gray-200 rounded"
                                    src={assets.box_icon}
                                    alt="Order"
                                />
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <p className="font-medium text-gray-900">
                                            {item.product.name}
                                            <span className='text-blue-600 ml-1'>× {item.quantity}</span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.product.category}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="flex-1 min-w-[200px] space-y-1 text-sm">
                            <p className="font-medium text-gray-900">
                                {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className="text-gray-600">
                                {order.address.street}, {order.address.city}
                            </p>
                            <p className="text-gray-600">
                                {order.address.state}, {order.address.zipcode}
                            </p>
                            <p className="text-gray-600">
                                {order.address.country}
                            </p>
                            <p className="text-gray-600">
                                {order.address.phone}
                            </p>
                        </div>

                        {/* Order Details */}
                        <div className="flex flex-col justify-between min-w-[180px]">
                            <div className="space-y-1">
                                <p className="font-medium text-gray-900">
                                    {currency}{order.amount}
                                </p>
                                <p className={`text-sm ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                                    Payment: {order.isPaid ? ' Paid' : 'Pending'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Method: {order.paymentType}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12">
                        <img
                            src={assets.empty_order}
                            alt="No orders"
                            className="w-32 h-32 mx-auto opacity-70"
                        />
                        <p className="mt-4 text-gray-500">No orders found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;