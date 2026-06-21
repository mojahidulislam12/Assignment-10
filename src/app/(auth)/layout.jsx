import Footer from "@/Components/Share/Footer";
import NavBar from "@/Components/Share/NavBar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <div>
      <NavBar></NavBar>
      <main> {children}</main>
      <Footer></Footer>
      <Toaster />
    </div>
  );
}
