// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serves index.html & assets

// Contact API
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Transporter setup
    let transporter = nodemailer.createTransport({
      service: "gmail", // you can also use Outlook, Yahoo, custom SMTP
      auth: {
        user: "victorjiggy12@gmail.com",      // replace with your email
        pass: "YOUR_APP_PASSWORD"          // use app password (not real password!)
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: "victorjiggy12@gmail.com",         // where messages will arrive
      subject: `New Contact from ${name}`,
      text: message,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
