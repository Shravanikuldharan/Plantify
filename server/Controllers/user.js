// import User from "../Models/User.js";

// const postSignup = async (req, res) => {
//   const { name, email, password, phone, address } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "name, email and password are required",
//     });
//   }

//   const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const nameValidationRegex = /^[a-zA-Z ]+$/;
//   const passwordValidationRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   if (!nameValidationRegex.test(name)) {
//     return res.status(400).json({
//       success: false,
//       message: "Name should contain only alphabets and spaces",
//     });
//   }

//   if (!emailValidationRegex.test(email)) {
//     return res.status(400).json({
//       success: false,
//       message: "Email is not valid",
//     });
//   }

//   if (!passwordValidationRegex.test(password)) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
//     });
//   }

//   // Check email exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({
//       success: false,
//       message: `User with email ${email} already exists`,
//     });
//   }

//   const newUser = new User({
//     name,
//     email,
//     password,  
//     phone,
//     address,
//   });

//   const savedUser = await newUser.save();

//   return res.json({
//     success: true,
//     message: "User registered successfully",
//     user: savedUser,
//   });
// };

// const postLogin = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "email and password are required",
//     });
//   }

//   // Find user with simple password match
//   const existingUser = await User.findOne({ email, password }).select(
//     "_id name email phone address role"
//   );

//   if (!existingUser) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid email or password",
//     });
//   }

//   return res.json({
//     success: true,
//     message: "User logged in successfully",
//     user: existingUser,
//   });
// };

// //Get users - Admin
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     return res.json({
//       success: true,
//       users,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// export { postSignup, postLogin, getAllUsers };

import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import md5 from "md5";

const postSignup = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "name, email and password are required",
    });
  }

  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameValidationRegex = /^[a-zA-Z ]+$/;
  const passwordValidationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameValidationRegex.test(name)) {
    return res.status(400).json({
      success: false,
      message: "Name should contain only alphabets and spaces",
    });
  }

  if (!emailValidationRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Email is not valid",
    });
  }

  if (!passwordValidationRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    });
  }

  // Check email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const newUser = new User({
    name,
    email,
    password: md5(password),
    phone,
    address,
  });

  const savedUser = await newUser.save();

  // Create token
  const token = jwt.sign(
    {
      id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
      role: savedUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    success: true,
    message: "User registered successfully",
    user: savedUser,
    token,
  });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }

  // hashed password match
  const existingUser = await User.findOne({
    email,
    password: md5(password),
  }).select("_id name email phone address role");

  if (!existingUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    success: true,
    message: "User logged in successfully",
    user: existingUser,
    token,
  });
};

// Admin - Protected
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { postSignup, postLogin, getAllUsers };