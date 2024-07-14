import { Ticket } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriority from "@/components/TicketPriority";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import DeleteButton from "./DeleteButton";

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>

          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription className="p-2">
            {`Created at: ${ticket.createdAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}`}
          </CardDescription>
          <CardDescription className="p-2">
            {`Last Update: ${ticket.updatedAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{ticket.description}</p>
        </CardContent>
        <CardFooter>
          <p>{`Ticket ID: ${ticket.id}`}</p>
        </CardFooter>
      </Card>
      <div>
        <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2 justify-center">
          <Link
            href={`/tickets/edit/${ticket.id}`}
            className={`${buttonVariants({
              variant: "default",
            })}`}
          >
            Edit Ticket
          </Link>
          <DeleteButton ticketId={ticket.id} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
