import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <ul className="flex [&.active]:underline justify-around gap-2 sm:gap-6 text-xs uppercase sm:text-xl ">
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
