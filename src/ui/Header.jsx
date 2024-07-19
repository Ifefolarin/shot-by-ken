import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Header() {
  return (
    <div className="flex items-center justify-between xl:w-[85rem] px-4 py-2 sm:py-6 border-b-[1px] border-b-stone-500 lg:text-stone-50 sm:px-14">
      <Logo />
      <NavMenu />
    </div>
  );
}

export default Header;
