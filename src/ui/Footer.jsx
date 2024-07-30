import Button from "./Button";
import Logo from "./Logo";
import { MdEmail, MdOutlineLocalPhone } from "react-icons/md";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io";

function Footer() {
  return (
    <div className="flex flex-col gap-4 px-6 py-6 bg-stone-950 text-stone-50">
      <div className="flex flex-col gap-5 justify-evenly sm:flex-row">
        <div className="flex flex-col gap-2">
          <Logo />
          <div className="items-center">
            <Button type="small" to="/contact">
              Book now
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="underline uppercase underline-offset-4 ">Contact</h2>
          <p className="flex items-center gap-1">
            {" "}
            <span>
              <MdEmail />
            </span>
            example@email.com
          </p>
          <p className="flex items-center gap-1">
            {" "}
            <span>
              <MdOutlineLocalPhone />
            </span>
            0987654321
          </p>
          <div className="flex gap-3 text-lg">
            <IoLogoInstagram />
            <IoLogoFacebook />
          </div>
          <p></p>
        </div>
        <div className="flex flex-col gap-3">
          <h2>Location</h2>
          <p>Ottawa, ON 🇨🇦</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-center uppercase text-stone-400">
        &copy; 2024 by shot by ken
      </p>
    </div>
  );
}

export default Footer;
