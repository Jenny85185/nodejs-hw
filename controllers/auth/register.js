const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar")
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helper");

const register = async(req, res) => {
  console.log("user register");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const verificationToken = uuidv4();
 const avatarUrl = gravatar.url(email);
  const newUser = new User({ email ,avatarUrl,verificationToken});
    newUser.setPassword(password);
    await newUser.save();

    const mail = {
      to: email,
      from: "jennufer85@gmail.com",
      subject: "Підтвердження email",
      html: `<a target ="_blank" href= 'http://localhost:300/api/users/verify/${verificationToken}>Підтвердити email</a>`,
    };

  await sendEmail(mail); 
  res.status(201).json({
    status: "success",
    code: "201",
    data: {
      user: {
        email,
        avatarUrl,
        verificationToken,
      },
    },
  });
};
module.exports = register;