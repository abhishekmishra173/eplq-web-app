import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    // 1. Configure the SMTP Transporter using your .env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // --- THIS IS THE CRITICAL FIX FOR YOUR CERTIFICATE ERROR ---
      tls: {
        rejectUnauthorized: false
      }
    });

    // 2. Format the Email Content (Styled to match your EPLQ theme)
    const mailOptions = {
      from: `"EPLQ Secure Node" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'EPLQ - Identity Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0B0F14; color: #ffffff; border-radius: 10px; border: 1px solid #1e293b;">
          <h2 style="color: #22d3ee; text-align: center; margin-bottom: 5px;">EPLQ SECURE NODE</h2>
          <hr style="border-color: #1e293b; margin-bottom: 20px;"/>
          <p style="font-size: 16px;">Authorization request received.</p>
          <p style="font-size: 16px;">To complete your node registration, please enter the following verification code:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; background-color: #1e293b; padding: 15px 30px; border-radius: 8px; color: #a855f7;">${otp}</span>
          </div>
          
          <p style="font-size: 14px; color: #94a3b8; text-align: center;">This code will expire shortly. Do not share this key with anyone.</p>
        </div>
      `,
    };

    // 3. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
  }
}