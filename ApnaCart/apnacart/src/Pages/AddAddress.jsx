import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Inputfield = ({type, placeholder, name, handleChange, address })=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)

const AddAddress = () => {

    const [address, setAddress] = useState({

        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setAddress((preaddress)=>({
            ...preaddress,
            [name]: value,
    }))

    }



    const onSubmitHandler = async (e) =>{
        e.preventDefault();
    }





  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-emerald-500'>Address</span></p>
    <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sum'>
                <div>
                    <Inputfield handleChange={handleChange} name="firstName" placeholder="firstname"
                    address={address} type='text' />
                    <Inputfield handleChange={handleChange} name="lastName" placeholder="lastname"
                    address={address} type='text' />
                </div>


            </form>


        </div>
        <img className="md:mr-16 mb-16 md:mt-0" src={assets.add_address_iamge} alt="Add Address"/>
    </div>
    </div>
  )
}

export default AddAddress