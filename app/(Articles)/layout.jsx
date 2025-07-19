import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToasterProvider } from "@/components/ToasterProvider";
export default async function PostsLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
        <ToasterProvider />
      </main>
      <Footer />
    </div>
  );
}
