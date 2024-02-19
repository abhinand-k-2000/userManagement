const express = require('express');
const user_route = express();

user_route.use(express.json())
user_route.use(express.urlencoded({extended: true}))

user_route.set('view engine', 'ejs');
user_route.set('views', './views/users') 

//Importing the verification of req
const auth = require('../middleware/auth')

// Importing the user controller
const userController = require('../controllers/userController');
const { urlencoded } = require('body-parser');

// User registration
user_route.get('/register', auth.isLogout, userController.loadRegister)
user_route.post('/register', userController.insertUser)

// Loading the welcome page
user_route.get('/', auth.isLogout, userController.loadWelcome)

// Loading the User Login page
user_route.get('/login',auth.isLogout, userController.loginLoad)

user_route.post('/login', userController.verifyLogin)

// Loading the User Home page
user_route.get('/home',auth.isLogin, userController.loadHome)

user_route.get('/logout', auth.isLogin, userController.userLogout)

// Loading the User Edit page
user_route.get('/edit', auth.isLogin, userController.editLoad)

user_route.post('/edit', userController.updateProfile)




 
module.exports = user_route;