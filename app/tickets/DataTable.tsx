import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";

interface Props {
  tickets: Ticket[];
  searchParms: SearchParams;
}

const DataTable = ({ tickets, searchParms }: Props) => {
  /* console.log("Era para ser a rela do tickets"); */
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: { ...searchParms, orderBy: "title" } }}>
                    Title
                  </Link>
                  {"title" === searchParms.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link href={{ query: { ...searchParms, orderBy: "status" } }}>
                    Status
                  </Link>
                  {"status" === searchParms.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParms, orderBy: "priority" } }}
                  >
                    Priority
                  </Link>
                  {"priority" === searchParms.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParms, orderBy: "createdAt" } }}
                  >
                    Created At
                  </Link>
                  {"createdAt" === searchParms.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} data-href="/">
                    <TableCell>
                      <div className="flex justify-center">
                        <Link
                          href={`/tickets/${ticket.id}`}
                          className="hover:bg-indigo-600"
                        >
                          {ticket.title}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <TicketStatusBadge status={ticket.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <TicketPriority priority={ticket.priority} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {ticket.createdAt.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
