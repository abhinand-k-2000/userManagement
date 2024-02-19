const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const securePassword = async(password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message)
    }
}

// Loading the login page of admin
const loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

// verification of the admin using credentials
const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_admin == 0) {
          res.render("login", { message: "You are not an admin" });
        } else {
          req.session.admin_id = userData._id;
          res.redirect("/admin/home");
        }
      } else {
        res.render("login", { message: "Password is incorrect" });
      }
    } else {
      res.render("login", { message: "Email is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Load the home page of admin
const loadHome = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.admin_id });
    res.render("home", { admin: userData });
  } catch (error) {
    console.log(error.message);
  }
};

// Admin logout - session destroying
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin");
  } catch (error) {
    console.log(error.message);
  }
};

// Loading the Admin dashboard 
const adminDashboard = async (req, res) => {
  try {
    const usersData = await User.find({ is_admin: 0 });
    res.render("dashboard", { users: usersData });
  } catch (error) {
    console.log(error.message);
  }
};

// Loading the new-user page for creating a new user from dashboard
const newUserLoad = async(req, res) => {
    try {
        res.render('new-user')
    } catch (error) {
        console.log(error.message)
    }
}

// Adding a new User 
const addUser = async(req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const spassword = await securePassword(password)

        const user = new User({
            name: req.body.name,
            email: email,
            mobile: req.body.mobile,
            password: spassword,
            is_admin: 0
        })

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.render('new-user', {message: "Email already exists"})
        }

        const userData = await user.save()

        if(userData){
            res.redirect('/admin/dashboard')
        }else{
            res.render('new-user', {message: "Registration failed"})
        }

    } catch (error) {
        console.log(error.message)
    }
}


// Load Edit user details - One by one using query parameter
const editUserLoad = async (req, res) => {
    try {
        
        const id = req.query.id;
        const userData = await User.findById({_id: id});

        if(userData){
            res.render('edit-user', {user: userData})
        }else{
            res.redirect('/admin/dashboard')
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

// Update the existing User
const updateUsers = async(req, res) => {
    try {
        
        const userData = await User.findByIdAndUpdate({_id: req.body.id},
             {$set: {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                // password: req.body.password
            }})
        
        res.redirect('/admin/dashboard')

    } catch (error) {
        console.log(error.message)
    }
}

// Delete user using query parameter
const deleteUser = async(req, res) => {
    try {
        
        const id = req.query.id;
        await User.findByIdAndDelete({_id: id})
        // await User.deleteOne({_id: id})
        res.redirect('/admin/dashboard')

    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
  loadLogin,
  verifyLogin,
  loadHome,
  logout,
  adminDashboard,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUsers,
  deleteUser
};
