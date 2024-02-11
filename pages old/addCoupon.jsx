import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddCoupon = () => {
  const [coupon, setCoupon] = useState({
    coupon_name: '',
    coupon_code: '',
    expired_date: '',
    coupon_img: '',
  });

  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/coupons', coupon);
      navigate("/")

    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div>
      <h2>Add Coupon</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="coupon_name">Coupon Name:</label>
        <input
          type="text"
          id="coupon_name"
          name="coupon_name"
          value={coupon.coupon_name}
          onChange={handleChange}
          required
        />

        <label htmlFor="coupon_code">Coupon Code:</label>
        <input
          type="text"
          id="coupon_code"
          name="coupon_code"
          value={coupon.coupon_code}
          onChange={handleChange}
          required
        />

        <label htmlFor="expired_date">Expiration Date:</label>
        <input
          type="date"
          id="expired_date"
          name="expired_date"
          value={coupon.expired_date}
          onChange={handleChange}
          required
        />

        <label htmlFor="coupon_img">Coupon Image URL:</label>
        <input
          type="text"
          id="coupon_img"
          name="coupon_img"
          value={coupon.coupon_img}
          onChange={handleChange}
        />

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
