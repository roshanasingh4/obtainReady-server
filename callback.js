const router = require("./routes/userRoute");

router.get('/callback', (req, res)=>{
    res.send("Logged in")
})

module.exports = router