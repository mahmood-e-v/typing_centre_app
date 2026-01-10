require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
    console.log('📧 Testing Email Configuration...');

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587');
    const secure = process.env.SMTP_SECURE === 'true';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        console.error('❌ Missing credentials! Please set SMTP_USER and SMTP_PASS in .env or environment.');
        process.exit(1);
    }

    console.log(`Settings: ${host}:${port} (${secure ? 'Secure' : 'Not Secure'})`);
    console.log(`User: ${user}`);

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
    });

    try {
        // Verify connection config
        await transporter.verify();
        console.log('✅ SMTP Connection verified successfully!');

        // Send test email
        console.log('📤 Sending test email...');
        const info = await transporter.sendMail({
            from: user,
            to: user, // Send to self
            subject: 'Test Email from Typing Centre App',
            text: 'If you are reading this, your email configuration is working perfectly! 🚀',
            html: '<h1>It Works!</h1><p>Your email configuration is working perfectly! 🚀</p>'
        });

        console.log('✅ Email sent successfully!');
        console.log(`Message ID: ${info.messageId}`);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);

    } catch (error) {
        console.error('❌ Failed to send email:');
        console.error(error);
    }
}

main();
