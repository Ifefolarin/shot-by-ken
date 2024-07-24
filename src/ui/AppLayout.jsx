import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]  ">
      <Header />

      <main className="w-screen px-1 mx-auto sm:px-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
