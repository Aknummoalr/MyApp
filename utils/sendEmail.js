const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
    }
    console.log("Credentials obtained, sending message...");   
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port:587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls:{
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        logger: true,
        debug: true,
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.error("SMTP Verification Error:", error);
        } else {
            console.log("SMTP Server is ready to send messages.");
        }
    });

    // Route to render the HTML form
    router.get("/", function(req, res) {
        const html = `
        <html>
            <head>
                <title>Send Email</title>
            </head>
            <body>
                <h1>Send Email</h1>
                <form action="/sendemail/send-mail" method="post">
                    <label for="to">To:</label>
                    <input type="text" id="to" name="to"><br><br>
                    <button type="submit">Send Mail</button>
                </form>
            </body>
        </html>`;
        res.send(html);
    });

    
    // Route to handle form submission and send email
    router.post("/send-mail", (req, res) => {
        const { to } = req.body;
        console.log("Sending email to:", to);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: "Reset Password",
            // text: "Hi there, this is an email1 from your app!1",
            html: `<!doctype html>
            <html>
                <head>
                    <title>Reset Password</title>
                </head>
                <body>
                    <h1>Reset Password</h1>
                    <p>Click <a href="http://localhost:3000/reset-password">here</a> to reset your password.</p>
                </body>
                </html>`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("Mail error:", error);
                res.json({ result: error });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ result: 1 });
            }
        });
    });
});

module.exports = router;