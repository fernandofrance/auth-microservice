const express = require('express');
const router = express.Router()
const animalModel = require("../models/Animal")

// Get all animals
router.get("/", async (req, res) => {
    const animal = await animalModel.find({})
    try {
        res.status(200).json(animal)
    } catch (err) {
        res.status(500).json({ message: "Error" })
        console.log(err)
    }
})

// Get specific animal

// NAO TA FUNCIONANDO ARRUMA AI DEPOIS
router.get("/", async (req, res) => {
    const { animalName, isExtinct } = req.query
    try {
        const animal = await animalModel.findOne({ animalName: animalName, isItExtinct: isExtinct })
        if (!animal) {
            res.status(404).json({ message: "Not found" })
        } else {
            res.status(200).json(animal)
        }
    } catch (err) {
        res.status(500).json({ message: "Error" })
        console.log(err)
    }
})

// Create new animal
router.post("/", async (req, res) => {
    const animal = new animalModel(req.body)
    try {
        await animal.save()
        res.status(202).json({ message: "Created" })
    } catch (err) {
        res.status(500).json({ message: "Error" })
        console.log(err)
    }
})

// Update existent animal
router.put("/", (req, res) => {
    res.send("User updated")
})

// Delete animal
router.delete("/", (req, res) => {
    res.send("User deleted")
})

module.exports = router;