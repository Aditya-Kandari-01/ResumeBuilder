
const userModel = require("../models/userModel");
const blacklistModel =  require("../models/blackListModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/**
 * @POST
 * @name registerUserController
 * @description register a new user
 * @access public
 */

const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body)

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password",
    });
  }
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (user) {
    return res.status(400).json({
      message: "Account already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign(
    {
      id: createUser._id,
      username: createUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token",token)
  res.status(201).json({// resource(user) created
    message:"User registered successfully",
    userDetails :{
        id : createUser._id,
        username : createUser.username,
        email : createUser.email
    }
  })
};

/**
 * @name loginUserController
 * @description login a new user
 * @access public
 */
const loginUserController = async (req, res) => {
    const {email,password} = req.body
    
    const user = await userModel.findOne({email})

    if (!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })   
    }

    const validPassword = await bcrypt.compare(password,user.password)

    if (!validPassword){
        return res.status(400).json({
            message:"Invalid email or password"
        })   
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    
    res.cookie("token",token)
    res.status(200).json({
        message:"user loggedIn successfully",
        user: {
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description clear the token from cookie and add it in blacklist
 * @access public
 */

const logoutUserController = async(req,res) =>{
    const token = req.cookies.token

    if (token){
        await blacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })

}


/**
 * @route getMeController
 * @description get the logged in user details
 * @access private
 */

const getMeController = async(req,res) =>{
  const user = await userModel.findById(req.user.id) // user.id = req.user from the authMiddleware
  res.status(200).json({
    message : "User details fetched successfully",
    user:{
      id : user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports = { registerUserController,loginUserController,logoutUserController,getMeController };
