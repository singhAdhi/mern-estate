import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const auth = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const saveData = new User({ username, email, password: hashedPassword });
  try {
    await saveData.save();
    res.status(201).json({
      data: "data saved succesfukly",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
