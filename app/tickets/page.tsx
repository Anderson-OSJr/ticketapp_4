import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  status: Status;
  page: string;
  orderBy: keyof Ticket;
  /* keyof - qualquer uma das chaves (chave: valor) da classe Ticket (id" | "title" | "description" | "status" | "priority" 
  | "createdAt" | "updatedAt") 
  Talvez, o certo fosse "keysOf*/
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  //Se o "status" não for "undefined"
  if (status) {
    where = { status };
  } else {
    where = {
      NOT: [{ status: "CLOSED" as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });

  /* Observe que o "orderBy" logo abaixo do "where" é um atributo do "findMany". 
  Não tem nada a ver com a constante orderBy criada. */
  const tickets = await prisma.ticket.findMany({
    where,
    orderBy: {
      [orderBy]: "desc",
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <>
      <div>
        <div className="flex gap-6">
          <Link
            href="/tickets/new"
            className={buttonVariants({ variant: "default" })}
          >
            New Ticket
          </Link>
          <StatusFilter />
        </div>

        <DataTable tickets={tickets} searchParms={searchParams} />

        <Pagination
          itemCount={ticketCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
    </>
  );
};

export default Tickets;
