import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Header() {
  return (
    <div className="flex items-center justify-between  px-4 py-2 sm:py-3 border-b-[1px] border-b-stone-500  sm:px-6">
      <Logo />
      <NavMenu />
    </div>
  );
}

export default Header;
