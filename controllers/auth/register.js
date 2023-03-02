const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar")

const register = async(req, res) => {
  console.log("user register");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
 const avatarUrl = gravatar.url(email);
  const newUser = new User({ email ,avatarUrl});
    newUser.setPassword(password);
    newUser.save();
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      user: {
        email,
        subscription: "starter",
        avatarUrl,
      },
    },
  });
};
module.exports = register;