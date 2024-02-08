import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    // Fetch user-specific coupons using the stored JWT token
    const fetchUserCoupons = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8800/user_coupons', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        setUserCoupons(response.data);
      } catch (error) {
        console.error('Error fetching user coupons:', error);
      }
    };

    fetchUserCoupons();
  }, []); // Empty dependency array ensures the effect runs once after initial render

  return (
    <div className="inventory-container">
      <h2>User's Inventory</h2>
      <ul className="coupon-grid">
        {userCoupons.map((coupon) => (
          <li key={coupon.coupon_id} className="coupon-item">
            {/* Display coupon details as needed */}
            <p>Name: {coupon.coupon_name}</p>
            <p>Code: {coupon.coupon_code}</p>
            <p>Expires: {coupon.formatted_expired_date}</p>
            {coupon.coupon_img && <img src={coupon.coupon_img} alt={`Coupon ${coupon.coupon_code}`} />}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
