import { NextResponse } from "next/server";
import { prisma } from "@/lib/dbInstance";
import { User } from "@/services/users";
// MSSQL'deki user tablosundan tüm kayıtları al
export async function GET() {
  try {
    const users = await prisma.operator_table.findMany({
      where: {
        is_active: 1,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("DB connection error:", error);
    return NextResponse.json(
      { error: "DB connection failed" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data: User = await req.json();

    if (!data.id_dec || !data.id_hex) {
      return NextResponse.json(
        { error: "id_dec veya id_hex eksik" },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.operator_table.update({
      where: {
        id_dec_id_hex: {
          id_dec: data.id_dec.toString(),
          id_hex: data.id_hex,
        },
      },
      data: {
        op_name: data.op_name,
        op_username: data.op_username,
        e_mail: data.e_mail,
        op_section: data.op_section,
        part: data.part,
        title: data.title,
        address: data.address,
        route: data.route,
        stop_name: data.stop_name,
        izin_bakiye: data.izin_bakiye,
        auth1: data.auth1,
        auth2: data.auth2,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Kullanıcı güncellenemedi." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id_dec: string; id_hex: string } }
) {
  try {
    const { id_dec, id_hex } = params;

    await prisma.operator_table.delete({
      where: {
        id_dec_id_hex: {
          id_dec: String(id_dec),
          id_hex: id_hex,
        },
      },
    });

    return NextResponse.json({ message: "Kayıt başarıyla silindi." });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Kayıt silinemedi." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data: User = await req.json();

    const createdUser = await prisma.operator_table.create({
      data: {
        id_dec: data.id_dec,
        id_hex: data.id_hex,
        op_name: data.op_name,
        op_username: data.op_username,
        op_password: data.op_password,
        e_mail: data.e_mail,
        op_section: data.op_section,
        part: data.part,
        title: data.title,
        address: data.address,
        route: data.route,
        stop_name: data.stop_name,
        izin_bakiye: data.izin_bakiye,
        short_name: data.short_name,
        gender: data.gender,
        is_active: data.is_active,
        is_admin: data.is_admin,
        is_approver: data.is_approver,
        shift_validator: data.shift_validator,
        auth1: data.auth1,
        auth2: data.auth2,
        roleId: data.roleId || null,
      },
    });

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Kullanıcı oluşturulamadı.",
      },
      { status: 500 }
    );
  }
}
