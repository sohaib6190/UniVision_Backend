const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    logger: true,
    auth: {
        user: 'xyz@gamil.com',
        pass: 'xxxxx'
    },
    tls: {
        rejectUnauthorized: true
    }
});

function sendCustomPasswordResetEmail(userEmail, displayName, link) {
    const mailOptions = {
        from: 'xyz@gmail.com',
        to: userEmail,
        subject: 'Password Reset Request',
        text: `Hello ${displayName},\n\nYou requested a password reset. Click the link below to reset your password:\n\n${link}\n\nIf you did not request this, please ignore this email.\n\nThank you.`
    };

    return transporter.sendMail(mailOptions);
}

async function generatePasswordResetLink(req, res) {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await admin.auth().getUserByEmail(email);
        const resetLink = await admin.auth().generatePasswordResetLink(email, {
            url: `http://localhost:5173/Login`,
        });

        await sendCustomPasswordResetEmail(email, name, resetLink);

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error generating password reset link:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    generatePasswordResetLink
};
