import { EmailTemplate } from '../../../components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL

export async function POST(req, res) {
    const {body} = await req;
    const {email, subject, massage } = body;
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: ["mirsyadibrahimfaqih1@gmail.com", email],
      subject: subject,
      react: (
        <>
        <h1>{subject}</h1>
        <p>Thank you for conetacting us!</p>
        <p>New message submited:</p>
        <p>{massage}</p>
        </>
      )
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}