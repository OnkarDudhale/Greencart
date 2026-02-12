import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/appContext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input 
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none focus:border-primary text-gray-500 transition mb-3'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    name={name}
    required
  />
);

const AddAddress = () => {
  const {axios,user,navigate}=useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post('/api/address/add',{address})
      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      
      <div className='flex flex-col-reverse md:flex-row justify-between items-start mt-10 gap-8'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First name'/>
              <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last name'/>
            </div>
            
            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email'/>
            <InputField handleChange={handleChange} address={address} name='phone' type='tel' placeholder='Phone number'/>
            <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street address'/>
            
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City'/>
              <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State'/>
            </div>
            
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country'/>
              <InputField handleChange={handleChange} address={address} name='zipcode' type='text' placeholder='ZIP code'/>
            </div>
            
            <button 
              type='submit' 
              className='w-full bg-primary text-white py-2.5 rounded mt-4 hover:bg-primary-dark transition'
            >
              Save Address
            </button>
          </form>
        </div>
        
        <img
          className='w-full max-w-md md:max-w-lg md:mr-16'
          src={assets.add_address_iamge} 
          alt="Add address " 
        />
      </div>
    </div>
  );
};

export default AddAddress;