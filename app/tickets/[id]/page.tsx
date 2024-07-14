import prisma from "@/prisma/db";
import TicketDetail from "./TicketDetail";

interface Props {
  params: { id: string };
}
const ViewTicket = async ({ params }: Props) => {
  const ticketById = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticketById) {
    return (
      <>
        <p className="text-destructive">Ticket not found!!</p>
      </>
    );
  }

  return (
    <>
      <div>
        <TicketDetail ticket={ticketById} />
      </div>
    </>
  );
};

export default ViewTicket;
