const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "", 
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database: ", err);
  } else {
    console.log("Connected to the database!");
  }
});

app.post("/api/driverlogin", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM driverregistration WHERE Email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error querying the database", err);
      return res.status(500).json({ error: "Internal server Error" });
    }

    if (result.length === 0) {
      console.log("Invalid email");
      return res.status(401).json({ error: "Invalid Email or password" });
    }

    const hashedPassword = result[0].Password;

    bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Error comparing passwords", compareErr);
        return res.status(500).json({ error: "Internal server Error" });
      }

      if (!isMatch) {
        console.log("Invalid password");
        return res.status(401).json({ error: "Invalid Email or password" });
      }

      const username = result[0].Username;
      return res.status(200).json({ message: "Login successful", username});
    });
  });
});


// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM registration WHERE Email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error querying the database", err);
      return res.status(500).json({ error: "Internal server Error" });
    }

    if (result.length === 0) {
      console.log("Invalid email");
      return res.status(401).json({ error: "Invalid Email or password" });
    }

    const hashedPassword = result[0].Password;

    bcrypt.compare(password, hashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Error comparing passwords", compareErr);
        return res.status(500).json({ error: "Internal server Error" });
      }

      if (!isMatch) {
        console.log("Invalid password");
        return res.status(401).json({ error: "Invalid Email or password" });
      }

      const username = result[0].Username;
      return res.status(200).json({ message: "Login successful", username});
    });
  });
});


// Registration endpoint

app.post("/api/register", (req, res) => {
  const { email, name, dob, password } = req.body;

  const checkUserQuery = "SELECT * FROM registration WHERE email = ?";
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking user: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "User already registered!" });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Error hashing password: " + hashErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      const sqlInsert =
        "INSERT INTO registration (Email, Username, DOB, Password) VALUES (?,?,?,?)";
      db.query(
        sqlInsert,
        [email, name, dob, hashedPassword],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting user:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          }
          console.log("User Registered Successfully!");
          return res
            .status(200)
            .json({ message: "User registered Successfully!" });
        }
      );
    });
  });
});

app.post("/api/driverregister", (req, res) => {
  const { email, name, dob, password } = req.body;

  const checkUserQuery = "SELECT * FROM registration WHERE email = ?";
  db.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Error checking user: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "User already registered!" });
    }

    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Error hashing password: " + hashErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      const sqlInsert =
        "INSERT INTO driverregistration (Email, Username, DOB, Password) VALUES (?,?,?,?)";
      db.query(
        sqlInsert,
        [email, name, dob, hashedPassword],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting user:", insertErr);
            return res.status(500).json({ error: "Internal server error" });
          }
          console.log("User Registered Successfully!");
          return res
            .status(200)
            .json({ message: "User registered Successfully!" });
        }
      );
    });
  });
});

app.post("/api/driverdetails", (req, res) => {
  const { name, phone, pickLocation, dropLocation } = req.body;
  console.log(pickLocation);
  const sqlInsert = "Insert INTO journeydetails (Name, Phoneno, Pickuplocation, dropLocation) values (?, ?, ?,?)";
  db.query(
    sqlInsert,
    [name, phone, pickLocation, dropLocation],
    (insertErr, insertResult) => {
      if(insertErr){
        console.error("Error inserting user:", insertErr);
        return res.status(500).json({ error: "Internal server error" });
      }
      console.log("Journey booked Successfully!");
          return res
            .status(200)
            .json({ message: "Journey Booked Successfully!" });
    }
  )
})




app.get("/api/journeydetails", (req, res) => {
  const sqlSelect = "SELECT * FROM journeydetails";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("Error retrieving journey details:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(result);
  });
});


const PORT = process.env.PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
