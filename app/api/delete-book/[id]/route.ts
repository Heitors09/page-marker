import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: any) {
  const { id } = params;

  //DELETE the book with the given id from database
  const book = await prisma.book.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json("Deleted", { status: 200 });
}
