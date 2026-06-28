import Footer from "@/Components/Share/Footer";
import NavBar from "@/Components/Share/NavBar";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <div>
      <NavBar></NavBar>
      <Suspense fallback={<p>Loading.....</p>}>
        <main> {children}</main>
      </Suspense>

      <Footer></Footer>
      <Toaster />
    </div>
  );
}
