const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define your email sending route
app.post('/send-email', async (req, res) => {
  const { recipientEmail, subject, content } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mctothebee@gmail.com',
      pass: 'mdew zmij tjws wvcn',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'mctothebee@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: content,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
