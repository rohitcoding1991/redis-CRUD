const User = require("../models/user");
const { sendEmail } = require("../utils/functions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.signUp = async (req, res) => {
  let { email, password } = req.body;
  let hashedPass;
  try {
    let user = await User.findOne({ email, status: 1 });
    if (user) {
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "user already exist",
        data: [],
      });
    }
    hashedPass = await bcrypt.hash(password, 10);
    user = user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hashedPass,
        },
        $setOnInsert: {
          isActive: false,
        },
      },
      { new: true, upsert: true }
    );
    await user.save();
    let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const confirmationLink = `http://localhost:3000/confirm/${token}`;
    await sendEmail(user.email, "Account Confirmation", "confirmationEmail", {
      user,
      confirmationLink,
    });
    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "email send successfully",
      data: [],
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: err.message,
      data: [],
    });
  }
};

exports.confirmAccount = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log({ userId });

    const user = await User.findOne({ _id: userId });
    console.log({ user });

    if (!user) {
      return res.status(400).send({
        status: "failed",
        statusCode: 400,
        message: "Invalid or expired token",
        data: [],
      });
    }
    if (user.status == 1) {
      return res.status(200).send({
        status: "success",
        statusCode: 200,
        message: "Account already confirmed",
        data: [],
      });
    }

    user.status = 1;
    await user.save();

    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "Account confirmed successfully!",
      data: [],
    });
  } catch (err) {
    console.error(err);
    res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: err.message,
      data: [],
    });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({
        status: "failed",
        statusCode: 400,
        message: "email and password is required",
        data: [],
      });
    }
    let user = await User.findOne({ email, status: 1 });
    if (!user) {
      return res.status(400).send({
        status: "failed",
        statusCode: 400,
        message: "user not exist",
        data: [],
      });
    }
    let checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).send({
        status: "failed",
        statusCode: 400,
        message: "invalid password",
        data: [],
      });
    }
    let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "user login successfully",
      data: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: err.message,
      data: [],
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = Buffer.from(email).toString("base64");

    await sendEmail(email, "Password Reset", "resetPassword", {
      resetToken,
      email,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const email = Buffer.from(resetToken, "base64").toString("ascii");

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.signUpLoginWithGoogle = async (req, res) => {
  let { providerId, email } = req.body;
  try {
    console.log({ email, providerId });

    let user = await User.findOne({
      $or: [{ email }, { providerId: { $exists: true, $ne: undefined } }],
    });
    console.log({ user });

    if (!user) {
      console.log("user exist or ont");
      let hashedPass = await bcrypt.hash("1234", 10);
      await sendEmail(email, "login password", "password", {
        password: "1234",
        email,
      });
      user = new User({
        providerId,
        email,
        password: hashedPass,
        status: 1,
      });
      await user.save();
    }
    let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({
      status: "success",
      statusCode: 200,
      message: "user login successfully",
      data: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      statusCode: 400,
      message: err.message,
      data: [],
    });
  }
};
