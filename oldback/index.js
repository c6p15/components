import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"randomcoupon"
})

app.use(express.json())
app.use(cors())

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/randomizer', authenticateToken, (req, res) => {
  const q = "SELECT coupon_id, coupon_name, coupon_code, rarity, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date FROM coupons WHERE coupon_status = 'available'";
  db.query(q, (err, coupons) => {
    if(err) return res.json(err);

    // Calculate the total weight
    let totalWeight = 0;
    for(let coupon of coupons) {
      totalWeight += (6 - coupon.rarity); // 1 is most common, so 6 - rarity gives higher weight to more common coupons
    }

    // Select a random coupon based on weight
    let randomNum = Math.random() * totalWeight;
    let selectedCoupon;
    for(let coupon of coupons) {
      randomNum -= (6 - coupon.rarity);
      if(randomNum <= 0) {
        selectedCoupon = coupon;
        break;
      }
    }

    // Update the status of the selected coupon to 'owned'
    const updateQuery = "UPDATE coupons SET coupon_status = 'owned' WHERE coupon_id = ?";
    db.query(updateQuery, [selectedCoupon.coupon_id], (err, result) => {
      if(err) return res.json(err);
      res.json(selectedCoupon);
    });
  });
});


app.post('/register', (req, res) => {
  const q = "INSERT INTO users (`email`, `username`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.email,
    req.body.username,
    req.body.password
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    } else {
      const token = jwt.sign({ id: data.insertId }, 'your_secret_key');
      return res.json({ token });
    }
  });
});

app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
  const values = [
    req.body.email,
    req.body.password
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }

    if (data.length > 0) {
      // User logged in successfully, generate a token for them
      const token = jwt.sign({ id: data[0].id }, 'your_secret_key');
      return res.json({ token });
    } else {
      return res.json("Fail");
    }
  });
});




app.get('/user_coupons', (req, res) => {
  const userId = req.params.user_id;
  
  const q = `
    SELECT coupons.*
    FROM user_inventory
    INNER JOIN coupons ON user_inventory.coupon_id = coupons.coupon_id
    WHERE user_inventory.user_id = ?;
  `;

  db.query(q, [userId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }

    return res.json(data);
  });
});








// get all coupons's data
app.get('/coupons',(req,res)=>{
    const q = "SELECT * FROM coupons"
    
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// get specific coupon's data
app.get("/coupons/:id",(req,res)=>{
    const couponId = req.params.id;
    const q = "SELECT coupon_id, coupon_name, coupon_code, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date, coupon_img FROM coupons WHERE coupon_id = ?"

    db.query(q,[couponId], (err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
});

// add coupon's data
app.post("/coupons", (req, res) => {
    // Assuming you have a way to identify the currently logged-in user
    const userId = req.body.user_id; // Adjust this based on how you manage user sessions or tokens

    const q = "INSERT INTO coupons (`coupon_name`,`coupon_code`,`expired_date`,`coupon_img`) VALUES (?)";
    const values = [
        req.body.coupon_name,
        req.body.coupon_code,
        req.body.expired_date,
        req.body.coupon_img
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error adding coupon");
        }

        const insertedCouponId = data.insertId;

        // Add the coupon to the user's inventory
        const q = "INSERT INTO user_inventory (`user_id`, `coupon_id`) VALUES (?, ?)";
        const values = [userId, insertedCouponId];

        db.query(q, values, (err) => {
            if (err) {
                console.log(err);
                return res.json("Error adding coupon to user inventory");
            }

            return res.json("Coupon added to user successfully.");
        });
    });
});

// update coupon's data
app.put("/coupons/:id",(req,res)=>{
    const couponId = req.params.id;
    const q = "UPDATE coupons SET `coupon_name` = ?, `coupon_code` = ?, `expired_date` = ?, `coupon_img` = ? WHERE coupon_id = ?"

    const values = [
        req.body.coupon_name,
        req.body.coupon_code,
        req.body.expired_date,
        req.body.coupon_img
    ];

    db.query(q, [...values,couponId], (err,data)=>{
        if (err) return res.json(err);
        return res.json("That coupon has been updated successfully.");
    })
})


app.listen(8800, ()=>{
    console.log("Connected to backend")
})