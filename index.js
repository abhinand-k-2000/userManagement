const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://abhinand2000:GQd86u94hUVMfTti@cluster0.03rs3pe.mongodb.net/customerdb?retryWrites=true&w=majority")

const express = require('express');
const app = express();

//load assets
const path = require('path')
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))

// Creating the session
const config = require('./config/config')
const session = require('express-session');
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}))

// Cache clearing     
app.use((req, res, next) => {
    if (res.headersSent) {
        return next();
    }
    res.setHeader('Cache-Control', 'no-store, no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '-1');
    next();
});

//Loding User and Admin routes
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/', userRoute)
app.use('/admin', adminRoute)
  
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT} `)
})      