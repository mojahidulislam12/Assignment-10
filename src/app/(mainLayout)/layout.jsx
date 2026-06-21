import Footer from "@/Components/Share/Footer";
import NavBar from "@/Components/Share/NavBar";
import dns from "node:dns";
import { Toaster } from "react-hot-toast";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
