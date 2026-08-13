import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-20 flex-1 flex items-center justify-center">
        <h1 className="text-3xl font-bold">Home funcionando 🎉</h1>
      </main>
      <Footer />
    </div>
  );
}

export default Home;