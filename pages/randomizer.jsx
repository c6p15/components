import React, { useState } from 'react';
import axios from 'axios';

const Randomizer = ({ userId }) => {
  const [randomCoupon, setRandomCoupon] = useState(null);

  const handleRandomize = async () => {
    try {
      // Get a random coupon from the server
      const response = await axios.get('http://localhost:8800/random-coupon');
      const coupon = response.data;

      // Add the random coupon to the user's inventory
      await axios.post('http://localhost:8800/add-to-inventory', {
        userId: userId,
        couponId: coupon.coupon_id,
      });

      // Update the state to display the random coupon
      setRandomCoupon(coupon);
    } catch (err) {
      console.error('Error randomizing coupon:', err);
    }
  };

  return (
    <div>
      <h2>Coupon Randomizer</h2>
      <button onClick={handleRandomize}>Randomize Coupon</button>
      {randomCoupon && (
        <div>
          <h3>Random Coupon:</h3>
          <p>Name: {randomCoupon.coupon_name}</p>
          <p>Code: {randomCoupon.coupon_code}</p>
          <p>Expires: {randomCoupon.expired_date}</p>
          {randomCoupon.coupon_img && <img src={randomCoupon.coupon_img} alt="Coupon" />}
        </div>
      )}
    </div>
  );
};

export default Randomizer;
