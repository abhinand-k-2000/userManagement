const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async(password) => {
    try {
        
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message)
    }
}

//Load welcome  
const loadWelcome = async(req, res) => {
    try {
        res.render('welcome')
    } catch (error) {
        console.log(error.message)
    }
}

// Load User Register
const loadRegister = async(req, res) => {
    try {
        res.render('registration');
    } catch (error) {
        console.log(error.message);
    }
}

// User Register input - Creating a new user
const insertUser = async(req, res) => {
    try {
        const spassword = await securePassword(req.body.password)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: spassword,
            is_admin: 0
        })  

        const email = req.body.email;
        const existingUser = await User.findOne({ email:email });

        if (existingUser) {
          return res.render('registration', { message: 'Email already exists. Please use a different email.' });
        }

        const userData = await user.save();

        if(userData){
            res.render('registration', {message: "Your registration has been successfull"})
        }else{
            res.render('registration', {message: "Your registration had been failed"});
        }

    } catch (error) {
        console.log(error.message)
    }
}

//Load user login Page
const loginLoad = async(req, res) => {

    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)
    }
}

//Verifying the user login - using credentials
const verifyLogin = async(req, res) =>{ 
    try {
        
        const email = req.body.email;
        const password = req.body.password;

       const UserData = await User.findOne({email: email});

       if(UserData){

           const passwordMatch = await bcrypt.compare(password, UserData.password)
           if(passwordMatch){
                req.session.user_id = UserData._id;
                res.redirect('/home');
           }else{
                res.render('login', {message: "Password is incorrect"})
           }
       }else{
            res.render('login', {message: "Email  is incorrect"})     
       }

    } catch (error) {
        console.log(error.message)
    }
}

// Load user Home Page
const loadHome = async(req, res) => {
    try {
        const userData = await User.findById({_id: req.session.user_id});
        res.render('home', {user: userData})
    } catch (error) {
        console.log(error.message)
    }
}

//User Logout - session destroying
const userLogout = async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login')
    } catch (error) {
        console.log(error.message)
    }
}

// Load User Edit Page
const editLoad = async(req, res) => {
    try {
        const id = req.query.id;

        const userData = await User.findById({_id: id}) 

        if(userData){
            res.render('edit', {user: userData})
        }else{
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error.message)
    }
}

// User Editing - Updating user details
const updateProfile = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(
            {_id: req.session.user_id},
            {$set: {name: req.body.name, email: req.body.email, mobile: req.body.mobile}})
        // console.log(userData)
            res.redirect('/home') 
    } catch (error) { 
        console.log(error.message)
    }
}


module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile,
    loadWelcome
}

