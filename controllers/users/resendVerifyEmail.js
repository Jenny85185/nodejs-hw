const { User } = require("../../models/user");
const { sendEmail } = require("../../helper");
const { NotFound } = require("http-errors");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }
  if (user.verify) {
    throw NotFound(" User already verify");
  }
  const mail = {
    to: email,
    from: "jennufer85@gmail.com",
    subject: "Підтвердження email",
    html: `<a target ="_blank" href= 'http://localhost:300/api/users/verify/${user.verificationToken}>Підтвердити email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Email verify resend",
  });
};
module.exports = resendVerifyEmail;