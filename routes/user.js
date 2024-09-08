const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signin", async (req, res) => {
    const {email, password}= req.body
   try{
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('token',token).redirect("/");
  } catch(error){
    return res.render('signin',{
      error:"Incorrect Password"
    })
  }
   
});


router.get('/logout', (req,res) =>{
  res.clearCookie('token'). redirect('/')
})

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    await User.create({ fullname, email, password });
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
