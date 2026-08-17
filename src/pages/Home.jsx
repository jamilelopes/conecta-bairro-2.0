import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCategories } from "../services/professionalsService";

const mockCategories = [
  { id: "cat-001", name: "Reparos Residenciais", slug: "reparos-residenciais" },
  { id: "cat-002", name: "Limpeza", slug: "limpeza" },
];

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  function handleSearch() {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (location.trim()) params.set("city", location.trim());
    navigate(`/explore?${params.toString()}`);
  }

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
                  <span className="material-symbols-outlined text-outline" aria-hidden="true">search</span>
                  <label htmlFor="home-category" className="sr-only">Qual categoria você procura</label>
                  <select
                    id="home-category"
                    className="bg-transparent border-none focus:ring-0 w-full outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="" disabled className="text-slate-400">Qual categoria?</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex items-center px-4 gap-3 bg-surface-container-low rounded-xl py-3">
                  <span className="material-symbols-outlined text-outline" aria-hidden="true">location_on</span>
                  <label htmlFor="home-location" className="sr-only">Qual cidade?</label>
                  <input
                    id="home-location"
                    className="bg-transparent border-none focus:ring-0 w-full outline-none"
                    placeholder="Qual cidade?"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-lg hover:scale-[0.98] transition-transform"
                >
                  Buscar
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Profissional autônomo trabalhando"
                className="relative w-full aspect-square rounded-[2rem] object-cover shadow-2xl"
              />
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
            {categories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/explore?category=${cat.slug}`)}
                className="group bg-surface-container-low p-8 rounded-3xl hover:bg-primary-container transition-all cursor-pointer"
              >
                <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors" aria-hidden="true">
                    {cat.icon || "home_repair_service"}
                  </span>
                </div>
                <span className="font-bold group-hover:text-white transition-colors">{cat.name}</span>
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