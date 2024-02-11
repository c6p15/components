import React, { useState } from 'react';
import axios from 'axios';

const RandomizerPage = () => {
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);

  const handleRandomize = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    // Include the token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Fetch a random coupon when the button is clicked
    axios.get('http://localhost:5000/randomizer', { headers })
      .then(res => {
        if (res.data.message) {
          setError(res.data.message);
        } else {
          setCoupon(res.data);
          setError(null);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Randomizer Page</h2>
      <button onClick={handleRandomize}>Randomize</button>
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

export default RandomizerPage;
