const express = require("express")
const router = express.Router()
const checkToken = require("../middlewares/middlewares");


router.get("/", checkToken(), (req, res) => {
    res.status(200).json({ message: "THIS IS A PRIVATE ROUTE" })
})

module.exports = router