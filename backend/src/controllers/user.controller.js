import User from "../models/user.model.js"; // User model to store the user details
import bcrypt from "bcryptjs"; // bcrypt js to hash the password of new users
import jwt from "jsonwebtoken"; // jwt to verify the user token for authentication

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // user details received from frontend to register

    const existingUser = await User.findOne({ email }); //checking for existing user
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10); // creating a hash password using bcrypt for security
    const user = new User({ name, email, password: hashedPassword }); // creating a user with the user details and hashed password

    await user.save(); // saving user
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // user details received from frontend to login

    const user = await User.findOne({ email }); // finding the user using email
    if (!user) return res.status(400).json({ message: "Invalid Credentials" }); // if user is not found

    const passwordMatched = await bcrypt.compare(password, user.password); // comparing the entered password with the saved password of user using bcrypt
    if (!passwordMatched)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // creating token that expires in 3 days for authentication
      expiresIn: "3d",
    });

    res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};
