import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToasterProvider } from "@/components/ToasterProvider";
export default async function PostsLayout({ children }) {
  return (
    <div className="relative">
      <Navbar />
      <main>
        {children}
        <ToasterProvider />
      </main>
      <Footer />
    </div>
  );
}
