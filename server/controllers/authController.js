const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile:user.profile,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid email or password')
    }
  })


const createUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400)
        throw new Error('All Fields are Required')
    }
    const user = await User.findOne({email});
    if(user){
        res.status(400)
        throw new Error('User with this email already exists')
    }
    const userDetails = await User.create({
        name,
        email,
        password
    });
    if(userDetails){
        res.status(201).json({
            _id:userDetails._id,
            name:userDetails.name,
            email:userDetails.email,
            isAdmin:userDetails.isAdmin,
            profile:userDetails.profile,
            token:generateToken(userDetails._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }
});


const googleAuth = asyncHandler(async(req,res) =>{
    const {tokenId} = req.body;
    const clientResp = await client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT});
    const {name,email,email_verified,picture} = clientResp.payload;
    if(email_verified){
        const user = await User.findOne({email});
        const password = name + '123';
        if(!user){
            const newUser = await User.create({
                name,
                email,
                profile:picture,
                isAdmin:false,
                password
            })
            if(newUser){
                res.status(201).json({
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    isAdmin:newUser.isAdmin,
                    profile:newUser.profile,
                    token:generateToken(newUser._id)
                })
            }
        }else{
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profile:user.profile,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        }
    }else{
        res.status(400)
        throw new Error('Google Email is not Verified')
    }
})

module.exports = {
    authUser,
    createUser,
    googleAuth
}