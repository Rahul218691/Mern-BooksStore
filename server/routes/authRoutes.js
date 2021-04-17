const router = require('express').Router();
const {authUser,createUser,googleAuth} = require('../controllers/authController');
const {userSigninValidator,userSignupValidator} = require('../validators/auth');
const {runValidation} = require('../validators');

router.post('/login',userSigninValidator,runValidation,authUser);
router.post('/register',userSignupValidator,runValidation,createUser);
router.post('/googleauth',googleAuth);

module.exports = router;