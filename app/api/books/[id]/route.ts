import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//in this file we want a get and patch request
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  //after destructure the id we want to GET the book with the given id from the database
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });

  return NextResponse.json(book, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { title, date } = await request.json();

  //update the book with the given ID from the database
  const book = await prisma.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      date,
    },
  });

  return NextResponse.json(book, { status: 200 });
}
