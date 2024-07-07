import prisma from "@/prisma/db";
import { ticketSchemaZodValidator } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = ticketSchemaZodValidator.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const validTicketToBeCreated = await prisma.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(validTicketToBeCreated, { status: 201 });
}
