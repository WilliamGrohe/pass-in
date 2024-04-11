import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Attendees } from "./pages/attendees";
import { Events } from "./pages/events";
import { DefaultPage } from "./pages/defaultPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route path="/" element={<Attendees />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
