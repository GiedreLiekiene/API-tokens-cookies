import UserModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({}, { address: 0 });

    res.status(202).json(allUsers);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { address, ...remainingUserData } = user._doc;
    res.status(200).json(remainingUserData);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been successfuly deleted");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await UserModel.deleteMany({ user: req.body.user });
    res.status(200).send("All users have been successfully deleted");
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};
