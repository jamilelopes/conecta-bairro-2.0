import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categorias = ["Reformas", "Aulas", "Beleza", "TI", "Eventos", "Limpeza"];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-surface to-surface-container">
          <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-[1.1] mb-6 tracking-tight">
                Conecte-se com a <span className="text-primary">Elite</span> dos Profissionais.
              </h1>
              <p className="text-lg text-on-surface-variant mb-10 max-w-lg leading-relaxed">
                De reformas residenciais a consultoria de TI, encontre especialistas selecionados para transformar seus projetos em realidade.
              </p>
              <div className="bg-surface-container-lowest p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-4 gap-3 bg-surface-container-low rounded-xl py-3">
                  <input
                    className="bg-transparent border-none focus:ring-0 w-full outline-none"
                    placeholder="Qual categoria?"
                    type="text"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 gap-3 bg-surface-container-low rounded-xl py-3">
                  <input
                    className="bg-transparent border-none focus:ring-0 w-full outline-none"
                    placeholder="Sua localização"
                    type="text"
                  />
                </div>
                <button
                  onClick={() => navigate("/explore")}
                  className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-lg hover:scale-[0.98] transition-transform"
                >
                  Buscar
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative w-full aspect-square rounded-[2rem] bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-2xl">
                Foto
              </div>
              <div className="absolute -bottom-4 left-4 bg-surface-container-lowest rounded-2xl shadow-lg p-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-lg">✓</span>
                <div>
                  <p className="font-bold text-sm">Profissionais confiáveis</p>
                  <p className="text-xs text-on-surface-variant">Próximos de você</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-surface text-center px-8">
          <h2 className="font-headline text-4xl font-bold mb-12">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {categorias.map((cat) => (
              <div
                key={cat}
                onClick={() => navigate("/explore")}
                className="group bg-surface-container-low p-8 rounded-3xl hover:bg-primary-container transition-all cursor-pointer"
              >
                <span className="font-bold group-hover:text-white transition-colors">{cat}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;