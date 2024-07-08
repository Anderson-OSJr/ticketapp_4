import prisma from "@/prisma/db";
import dynamic from "next/dynamic";

interface Props {
  params: { id: string };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const EditTicket = async ({ params }: Props) => {
  const ticketToBeUpdated = await prisma?.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticketToBeUpdated) {
    return <p className="text-destructive">Ticket not found!</p>;
  }
  return <TicketForm ticket={ticketToBeUpdated} />;
};

export default EditTicket;
