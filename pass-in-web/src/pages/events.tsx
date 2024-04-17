import { ChangeEvent, useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

import { IconButton } from "../components/icon-button";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCell } from "../components/table/table-cell";
import { CreateEvent } from "../components/create-event";
import { LoadEvents } from "../utils/load-events";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Event {
  id: string;
  title: string;
  details: string;
  createdAt: string | null;
  maximumAttendees: number | null;
  attendeesAmount: string | null;
}


export function Events() {

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });

  const [total, setTotal] = useState(0);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  

  const totalPages = Math.ceil(total / 10);

  // const url = new URL("http://localhost:3333/events");
  // const url = new URL("https://pass-in-rest-api.onrender.com/events");

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    window.history.pushState({}, "", url);

    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    window.history.pushState({}, "", url);

    setPage(page);
  }

  // useEffect(() => {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setAllEvents(data.events);
  //       setTotal(data.events.length);
  //     });
  // }, []);

  useEffect(() => {
    LoadEvents(setAllEvents, setTotal)
  }, [])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Eventos</h1>
      <span className="font-medium text-md text-zinc-300">Lista de eventos cadastrados na plataforma.</span>
      <div className="flex gap-3 items-left">
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            type="text"
            className="bg-transparent flex-1 outline-none border-none p-0 text-sm cursor-pointer focus:ring-0"
            placeholder="Buscar evento..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="rounded bg-black/20 border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da criação</TableHeader>
            <TableHeader>Participantes confirmados</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {allEvents.map((event) => {
            return (
              <tr
                key={event.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <input
                    className="rounded size-4 checked:accent-orange-400 bg-black/20 border border-white/10 cursor-pointer"
                    type="checkbox"
                  />
                </TableCell>
                <TableCell>{event.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {event.title}
                    </span>
                    <span>{event.details}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(event.createdAt)}</TableCell>
                <TableCell>
                  {event.attendeesAmount === null ? (
                    <span className="text-zinc-400">'Não fez check-in' </span>
                  ) : (
                    <span>
                      {event.attendeesAmount}/{event.maximumAttendees}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {allEvents.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    <CreateEvent />
    </div>

  );
}
