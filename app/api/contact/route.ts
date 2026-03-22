import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  // Config SMTP (ex: Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact from ${name}`,
    text: message,
  });

  return NextResponse.json({ success: true });
}