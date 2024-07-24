import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <ul className="flex justify-between gap-2 text-xs uppercase sm:gap-6 sm:text-xl ">
      <li className="link">
        <NavLink to="packages">Packages</NavLink>
      </li>
      <li className="link ">
        <NavLink to="gallery">Gallery</NavLink>
      </li>
      <li className="link">
        <NavLink to="contact">Contact</NavLink>
      </li>
    </ul>
  );
}

export default NavMenu;
