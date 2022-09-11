import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new UserModel({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("New user is created");
  } catch (error) {
    console.error(error);
    res.status(405).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("Wrong user or password");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).send("Wrong user or password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1 day",
    });

    return res
      .cookie("session_token", token, {
        httpOnly: true,
      })
      .status(201)
      .send(`Successfully logged in!`);
  } catch (error) {
    console.error(error);
    res.status(405).send(error);
  }
};
