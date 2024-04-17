import { Dispatch } from "react";

interface Event {
  id: string;
  title: string;
  details: string;
  createdAt: string | null;
  maximumAttendees: number | null;
  attendeesAmount: string | null;
}

export function LoadEvents(
  setEvents: Dispatch<React.SetStateAction<Event[]>>,
  setTotal: Dispatch<React.SetStateAction<number>>
) {
  const url = new URL("http://localhost:3333/events");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setEvents(data.events);
      setTotal(data.events.length);
    });
}
