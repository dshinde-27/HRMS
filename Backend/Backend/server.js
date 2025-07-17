const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✔️ Declare 'app' first!

app.use(cors());
app.use(express.json());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // use: 192.168.189.54
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    port: 1433
  }
};

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request:', username);

  try {
    const pool = await sql.connect(config);

    // ✅ 1. Check if user exists in Register table
    const registerCheck = await pool
      .request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query(`
        SELECT * FROM Register 
        WHERE username = @username AND password = @password
      `);

    if (registerCheck.recordset.length === 0) {
      return res.status(401).json({ message: 'User not registered or invalid credentials' });
    }

    // ✅ 2. Check if user already exists in Login table
    const loginCheck = await pool
      .request()
      .input('username', sql.NVarChar, username)
      .query(`SELECT * FROM Login WHERE username = @username`);

    const loginTime = new Date();

    if (loginCheck.recordset.length > 0) {
      // ✅ 3a. Update loginCount and loginTime
      const currentCount = parseInt(loginCheck.recordset[0].loginCount) || 0;
      const newCount = currentCount + 1;

      await pool
        .request()
        .input('username', sql.NVarChar, username)
        .input('loginTime', sql.DateTime, loginTime)
        .input('loginCount', sql.NVarChar, newCount.toString())
        .query(`
          UPDATE Login 
          SET loginTime = @loginTime, loginCount = @loginCount 
          WHERE username = @username
        `);
    } else {
      // ✅ 3b. Insert new login record
      await pool
        .request()
        .input('username', sql.NVarChar, username)
        .input('loginTime', sql.DateTime, loginTime)
        .input('loginCount', sql.NVarChar, '1')
        .query(`
          INSERT INTO Login (username, loginTime, loginCount)
          VALUES (@username, @loginTime, @loginCount)
        `);
    }

    // ✅ 4. Login success
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// =================================== Register Api=====================================================
app.post('/api/register', async (req, res) => {
  const { firstname, lastname, email, dob, phonenumber, username, password, gender } = req.body;

  try {
    const pool = await sql.connect(config);

    // ✅ Get current highest RegId
    const result = await pool.request().query(`
      SELECT TOP 1 RegId 
      FROM Register 
      WHERE RegId IS NOT NULL 
      ORDER BY Id DESC
    `);

    let newRegId = 'REG00000001'; // Default if table is empty

    if (result.recordset.length > 0) {
      const lastRegId = result.recordset[0].RegId; // e.g. REG00000125
      const lastNumber = parseInt(lastRegId.replace('REG', ''), 10);
      const nextNumber = lastNumber + 1;
      newRegId = 'REG' + nextNumber.toString().padStart(8, '0'); // REG00000126
    }

    // ✅ Insert new user
    await pool.request()
      .input('RegId', sql.NVarChar, newRegId)
      .input('firstname', sql.NVarChar, firstname)
      .input('lastname', sql.NVarChar, lastname)
      .input('email', sql.NVarChar, email)
      .input('dob', sql.NVarChar, dob)
      .input('phonenumber', sql.NVarChar, phonenumber)
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .input('gender', sql.NVarChar, gender)
      .query(`
        INSERT INTO Register (RegId, firstname, lastname, Email, username, password, phonenumber, gender, dob, createdOn)
        VALUES (@RegId, @firstname, @lastname, @email, @username, @password, @phonenumber, @gender, @dob, GETDATE())
      `);

    res.status(201).json({ message: 'Registration successful!', regId: newRegId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error during registration.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

