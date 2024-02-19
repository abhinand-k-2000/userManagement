const express = require("express");
const admin_route = express();

admin_route.use(express.json());
admin_route.use(express.urlencoded({ extended: true }));

admin_route.set("view engine", "ejs");
admin_route.set("views", "./views/admin");


//Importing the verification of req
const auth = require("../middleware/adminAuth");

// Importing the admin controller
const adminController = require("../controllers/adminController");

admin_route.get("/", auth.isLogout, adminController.loadLogin);

admin_route.post("/", adminController.verifyLogin);

admin_route.get("/home", auth.isLogin,  adminController.loadHome);

admin_route.get("/logout", auth.isLogin, adminController.logout);

admin_route.get("/dashboard", auth.isLogin, adminController.adminDashboard);

admin_route.get('/new-user', auth.isLogin, adminController.newUserLoad); 

admin_route.post('/new-user', adminController.addUser)

admin_route.get('/edit-user', auth.isLogin, adminController.editUserLoad)

admin_route.post('/edit-user', adminController.updateUsers)

//Delete User
admin_route.get('/delete-user', adminController.deleteUser)

admin_route.get('*', (req, res) => {
    res.redirect('/admin')
})

module.exports = admin_route;
