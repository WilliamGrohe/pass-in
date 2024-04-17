import { FormEvent, useState } from "react";

export function CreateEvent() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [maximumAttendees, setMaximumAttendees] = useState(0);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    registerEventOnDatabase();
  }

  async function registerEventOnDatabase() {
    const data = {
      title: title,
      details: details,
      maximumAttendees: maximumAttendees,
    };

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    const result = await fetch("http://localhost:3333/events", requestOptions);
    if (result.status === 201) {
      alert('Evento criado com sucesso!')
    }
    
  }

  return (
    <div>
      <h2 className="mb-4 text-lg">Criar um novo evento:</h2>
      <form onSubmit={handleSubmit} className="">
        <input
          type="text"
          value={title}
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-black/20 rounded-lg outline-none border-white/20 focus:ring-0 focus:border-white/60 mr-2"
        />
        <input
          type="text"
          value={details}
          placeholder="Detalhes"
          onChange={(e) => setDetails(e.target.value)}
          className="bg-black/20 rounded-lg outline-none border-white/20 focus:ring-0 focus:border-white/60 mr-2"
        />
        <input
          type="number"
          placeholder="Máximo de participantes"
          min={0}
          onChange={(e) => setMaximumAttendees(parseInt(e.target.value))}
          className="bg-black/20 rounded-lg outline-none border-white/20 focus:ring-0 focus:border-white/60 mr-2"
        />
        <button type="submit" className="bg-slate-600 px-8 py-2 rounded-lg hover:bg-slate-700 font-medium">
          Salvar
        </button>
      </form>
    </div>
  );
}
