import { Outlet } from "react-router-dom";
import akere from "../assets/akere.jpeg";

import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen justify-center grid-rows-[auto_1fr_auto]  ">
      <Header />
      <img
        className="h-[200px] w-[24rem] md:h-[35rem] md:w-full lg:absolute lg:w-full lg:h-full lg:-z-10 grayscale transition-all duration-300"
        src={akere}
        alt="image of akere"
      />
      <div>
        <main className="mx-auto max-w-[120rem] px-1 sm:px-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
