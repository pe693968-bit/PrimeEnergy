import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      phone,
      service,
      budget,
      message,
    } = data;

    // 🔴 Basic validation
    if (!name || !email || !service || !budget || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔹 Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    // 🔹 Email template
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: `New Contact Inquiry – ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
          <h2>New Contact Message</h2>
          <hr />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Service Required:</strong> ${service}</p>
          <p><strong>Estimated Budget:</strong> ${budget} thousand pkr</p>

          <h4>Message:</h4>
          <p>${message}</p>

          <hr />
          <p style="font-size:12px;color:#666">
            This message was sent from the website contact form.
          </p>
        </div>
      `,
    };

    // 🔹 Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Email sending failed." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
