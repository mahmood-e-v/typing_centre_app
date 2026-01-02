import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface SendMailParams {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export async function sendMail({ to, subject, text, html }: SendMailParams) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.warn('⚠️ SMTP settings not configured. Email will not be sent.');
        console.log('Dummy Email Content:', { to, subject, text });
        return;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"ServiceCenterPro" <no-reply@servicecenterpro.com>',
            to,
            subject,
            text,
            html,
        });

        console.log('✅ Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
}
