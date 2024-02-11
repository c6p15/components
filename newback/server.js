import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import jwt from "jsonwebtoken";

const app = express();
const jwtSecret = "secret-key";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "randomcoupon",
});

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
});


app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
  const q =
    "INSERT INTO users (`email`, `username`, `password`) VALUES (?, ?, ?)";
  const values = [req.body.email, req.body.username, req.body.password];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: "Error" });
    } else {
      const user = { id: data.insertId };

      // Generate a token
      const token = jwt.sign(user, jwtSecret, { expiresIn: "1h" }); // Set the expiration time as needed

      return res.json({ success: true, token });
    }
  });
});

// Login route
app.post("/login", (req, res) => {
  const q = "SELECT * FROM users WHERE `email` = ?";
  const values = [req.body.email];

  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: "Error" });
    }

    if (data.length > 0) {
      if (req.body.password === data[0].password) {
        const user = { id: data[0].id };

        // Generate a token
        const token = jwt.sign(user, jwtSecret, { expiresIn: "1h" }); // Set the expiration time as needed

        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, error: "Incorrect password" });
      }
    } else {
      return res.json({ success: false, error: "Email not found" });
    }
  });
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM coupons";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get('/randomizer', (req, res) => {
  const q = "SELECT coupon_id, coupon_name, coupon_code, rarity, DATE_FORMAT(expired_date, '%d/%m/%y') AS formatted_expired_date FROM coupons WHERE coupon_status = 'available'";
  db.query(q, (err, coupons) => {
    if(err) return res.json(err);
    if (coupons.length === 0) {
      return res.json({ message: "No coupons available." });
    }

    let totalWeight = 0;
    for(let coupon of coupons) {
      totalWeight += (6 - coupon.rarity); 
    }

    let randomNum = Math.random() * totalWeight;
    let selectedCoupon;
    for(let coupon of coupons) {
      randomNum -= (6 - coupon.rarity);
      if(randomNum <= 0) {
        selectedCoupon = coupon;
        break;
      }
    }

    const updateQuery = "UPDATE coupons SET coupon_status = 'owned' WHERE coupon_id = ?";
    db.query(updateQuery, [selectedCoupon.coupon_id], (err, result) => {
      if(err) return res.json(err);

      const insertQuery = "INSERT INTO user_inventory (user_id, coupon_id) VALUES (?, ?)";
      db.query(insertQuery, [req.user.id, selectedCoupon.coupon_id], (err, result) => {
        if(err) return res.json(err);
        res.json(selectedCoupon);
      });
    });
  });
});


app.listen(5000, () => console.log("Server started on port 5000"));
