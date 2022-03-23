const express = require('express');
const bcrypt = require("bcrypt")

const User = require("../models/User")
const router = express.Router();

// Sign-In
router.post("/signin", async (req, res) => {
    const { name, email, password } = req.body

    // Validations
    if (!name) {
        return res.status(400).json({error: "Missing name"})
    }
    if (!email) {
        return res.status(400).json({error: "Missing email"})
    }
    if (!password) {
        return res.status(400).json({error: "Missing password"})
    }
    
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        return res.status(400).json({error: "User already exists"})
    }
    
    // Password hashing
    const salt = await bcrypt.genSalt(12)
    const passwdHash = await bcrypt.hash(password, salt)

    // Registering user
    const user = new User({
        name,
        email,
        password: passwdHash
    })

    try {
        await user.save()
        res.status(201).send({ message: "User created." })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
    }
})

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    // Validations
    if (!email) {
      return res.status(400).json({ error: "Missing email" });
    }
    if (!password) {
      return res.status(400).json({ error: "Missing password" });
    }

    // Check if user exists
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).json({ error: "User not found" })
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(403).json({ error: "Invalid password" })
    }

    // Log in
    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            {
                id: user_id
            },
            secret
        ) 

        res.status(200).json({ message: "User authenticated" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

module.exports = router