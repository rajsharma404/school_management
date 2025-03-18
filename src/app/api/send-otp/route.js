import nodemailer from "nodemailer";

export async function POST(req) {
    const { email, otp } = await req.json();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return Response.json({ message: "OTP sent successfully!" });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
