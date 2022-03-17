const mongoose = require('mongoose')

const AnimalSchema = new mongoose.Schema({
    animalName: {
        type: String,
        required: true
    },
    isExtinct: {
        type: Boolean,
        required: true
    },
    yearsLifeExpectancy: {
        type: Number,
        required: true
    }
})

const Animal = mongoose.model("AnimalData", AnimalSchema)
module.exports = Animal