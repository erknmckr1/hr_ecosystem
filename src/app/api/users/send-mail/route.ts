import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { User } from "@/services/users";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { users } = body;

    if (!users || users.lenght > 0) {
      return NextResponse.json(
        { error: "Kullanıcı listesi boş" },
        { status: 400 }
      );
    }

    // Hotmail/Outlook SMTP ayarı
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Kullanıcı bilgilerini tablo haline getirelim (basit HTML)
    const userTable = `
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Kullanıcı Adı</th>
            <th>E-Posta</th>
            <th>Bölüm</th>
            <th>Birim</th>
            <th>Ünvan</th>
          </tr>
        </thead>
        <tbody>
          ${users
            .map(
              (u: User) => `
            <tr>
              <td>${u.op_name || ""}</td>
              <td>${u.op_username || ""}</td>
              <td>${u.e_mail || ""}</td>
              <td>${u.op_section || ""}</td>
               <td>${u.part || ""}</td>
              <td>${u.title || ""}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Gönderici
      to: process.env.TO, // Alıcı
      cc: process.env.CC_USER,
      subject: "Personel",
      html: `
        <h3>Seçilen Kullanıcılar</h3>
        ${userTable}
      `,
    });

    return NextResponse.json(
      { message: "Mail Başarı ile gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return NextResponse.json({ error: "Mail gönderilemedi" }, { status: 500 });
  }
}
