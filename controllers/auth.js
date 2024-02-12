import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    const vpassword = req.body.password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    console.log(req.body)

    if (user) {
      return res.status(400).send({ message: "Username already exists" });
    } else if (email){
      return res.status(400).send({ message: "Email already exists" });
    } else if (vpassword.length < 7){
      return res.status(400).send({message: "Password must be at least 7 characters long"})
    }

    if (!passwordRegex.test(vpassword)){
      return res.status(400).send({message: "Password must include at least one Uppercase,Lowercase letter, Number and Special character."})
    }

    
   
  

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const restrictedCharsRegex = /['"();]/;
    const user = await User.findOne({ username: req.body.username });
    
    if (restrictedCharsRegex.test(req.body.username)) {
      
      res.status(400).send({
        message: 'TextField cannot contain characters like (\',(),[] ;, ")',
      });
    }  else if (!user){
      res.status(400).send({
        message: 'User not found',
      });
    }

    // const user = await User.findOne({ username: req.body.username });
    // if (!user) return next(createError(404, "User not found!"));
    
    
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

      
      

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      {expiresIn: '10d'}
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

// export const logout = (req, res) => {
//   // Clear the authentication token on the client-side by removing the cookie
//   res.clearCookie("access_token");
//   res.status(200).json({ message: "Logout successful" });
// };

export const logout = (req, res) => {
  // Clear the authentication token on the client-side by removing the cookie
  res.clearCookie("access_token");

  // Destroy the session on the server side
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
};

function isValidEmailFormat(email) {
  // Use a regular expression for basic email format validation
  const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailFormatRegex.test(email);
}

