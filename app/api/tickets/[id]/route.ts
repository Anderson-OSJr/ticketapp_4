import prisma from "@/prisma/db";
import { ticketSchemaZodValidator } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = ticketSchemaZodValidator.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticketToBeUpdated = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticketToBeUpdated) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketToBeUpdated.id },
    data: { ...body },
  });

  return NextResponse.json(updatedTicket, { status: 201 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const ticketToBeDeleted = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticketToBeDeleted) {
    return NextResponse.json({ error: "Ticket Not Found" }, { status: 404 });
  }

  const deletedTicket = await prisma.ticket.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: "Ticket Deleted" });
}
