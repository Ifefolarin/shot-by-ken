import { Outlet } from "react-router-dom";
import akere from "../assets/akere.jpeg";

import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]  ">
      <Header />
      <img
        className="h-[200px] w-[24rem] md:h-[35rem] md:w-full lg:absolute lg:w-full lg:h-dvh lg:-z-10 grayscale transition-all duration-300"
        src={akere}
        alt="image of akere"
      />
      <div className="flex flex-col">
        <main className="mx-auto max-w-[120rem] px-1 sm:px-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
