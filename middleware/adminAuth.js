const isLogin = async (req, res, next) => {
    try {
        if (req.session.admin_id) {
            next(); // User is logged in, continue to the next middleware or route handler
        } else {
            res.redirect('/admin'); // User is not logged in, redirect to the login page
        }
    } catch (error) {
        console.log(error.message);
        next(error); // Pass the error to the next middleware or error-handling middleware
    }
};

const isLogout = async (req, res, next) => {
    try {
        if (req.session.admin_id) {
            res.redirect('/admin/home'); // User is logged in, redirect to the home page
        } else {
            next(); // User is not logged in, continue to the next middleware or route handler
        }
    } catch (error) {
        console.log(error.message);
        next(error); // Pass the error to the next middleware or error-handling middleware
    }
};

module.exports = {
    isLogin,
    isLogout, 
};
