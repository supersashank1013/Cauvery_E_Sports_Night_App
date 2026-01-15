const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (to, teamName, teamLeader, game) => {
  await transporter.sendMail({
    from: `"Cauvery E-Sports Night" <${process.env.EMAIL_USER}>`,
    to,
    subject: "✅ Registration Confirmed — Cauvery E-Sports Night",
    html: `
      <h2>Registration Successful 🎮</h2>
      <p><strong>Team Name:</strong> ${teamName}</p>
      <p><strong>Team Leader:</strong> ${teamLeader}</p>
      <p><strong>Game:</strong> ${game}</p>
      <p>We’ll contact you soon with further details.</p>
      <br/>
      <p>— Cauvery E-Sports Night Team</p>
    `,
  });
};

module.exports = sendConfirmationEmail;
