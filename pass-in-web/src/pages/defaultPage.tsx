import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function DefaultPage() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <Outlet />
    </div>
  );
}
