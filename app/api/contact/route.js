import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // or your email host
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your email app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER, // your receiving email
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Email sending failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
