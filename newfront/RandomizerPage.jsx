import React, { useState , useEffect } from 'react';
import axios from 'axios';

const Randomizer = () => {
    const [coupon, setCoupon] = useState(null);

    const getRandomCoupon = async () => {
      try {
          const token = localStorage.getItem('token'); // replace this with the actual token
          const res = await axios.get('http://localhost:5000/randomizer', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setCoupon(res.data);
      } catch (error) {
          console.error("Error fetching random coupon", error);
      }
  };
  

return (
    <div>
      <button onClick={getRandomCoupon}>Randomize</button>
      {error ? (
        <p>{error}</p>
      ) : coupon ? (
        <div>
          <h1>{coupon.coupon_name}</h1>
          <p>Code: {coupon.coupon_code}</p>
          <p>Rarity: {coupon.rarity}</p>
          <p>Expires on: {coupon.formatted_expired_date}</p>
        </div>
      ) : (
        <p>Click the "Randomize" button to get a coupon.</p>
      )}
    </div>
  );
};


export default Randomizer;


