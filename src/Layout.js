import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
