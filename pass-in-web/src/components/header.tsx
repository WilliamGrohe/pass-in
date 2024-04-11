import logoIcon from '../assets/logo-icon.svg'
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className="flex items-center gap-5 py-2">
      <img src={logoIcon} />

      <nav className='flex items-center gap-5'>
        <NavLink to='/events' className='text-zinc-300'>Eventos</NavLink>
        <NavLink to='/'>Participantes</NavLink>
      </nav>
    </div>
  )
}