import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfessionalCard from "../components/ProfessionalCard";
import { getProfessionals, getCategories } from "../services/professionalsService";

const mockProfessionals = [
  { name: "Marcos Silva", title: "Arquiteto e Reformas", city: "São Paulo", state: "SP", slug: "marcos-silva", avatar_url: "https://picsum.photos/seed/marcos/400/400" },
  { name: "Ricardo Oliveira", title: "Especialista em Reformas", city: "São Paulo", state: "SP", slug: "ricardo-oliveira", avatar_url: "https://picsum.photos/seed/ricardo/400/400" },
  { name: "Helena Mendes", title: "Arquitetura de Interiores", city: "Curitiba", state: "PR", slug: "helena-mendes", avatar_url: "https://picsum.photos/seed/helena/400/400" },
  { name: "André Costa", title: "Pintura Comercial", city: "Rio de Janeiro", state: "RJ", slug: "andre-costa", avatar_url: "https://picsum.photos/seed/andre/400/400" },
];

const mockCategories = [
  { id: "cat-001", name: "Reparos Residenciais", slug: "reparos-residenciais" },
  { id: "cat-002", name: "Limpeza", slug: "limpeza" },
];

const ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

function Explore() {
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialCity = searchParams.get("city");

  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedState, setSelectedState] = useState("");
  const [cityInput, setCityInput] = useState(initialCity || "");

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch(() => setUsingMock(true));
  }, []);

  useEffect(() => {
    setLoading(true);
    const filters = {};
    if (selectedCategories.length > 0) filters.category = selectedCategories.join(",");
    if (selectedState) filters.state = selectedState;
    if (cityInput.trim()) filters.city = cityInput.trim();

    getProfessionals(filters)
      .then((data) => {
        setProfessionals(data);
        setLoading(false);
      })
      .catch(() => {
        setUsingMock(true);
        setLoading(false);
      });
  }, [selectedCategories, selectedState, cityInput]);

  function toggleCategory(slug) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedState("");
    setCityInput("");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex pt-20">
        <aside className="w-[300px] h-[calc(100vh-80px)] fixed left-0 overflow-y-auto border-r border-slate-200/50 bg-white p-8 hidden md:block">
          <h2 className="font-headline font-bold text-lg mb-8 tracking-tight">Filtros</h2>

          <div className="mb-8">
            <span className="text-sm font-semibold block mb-4">Categorias</span>
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-3 mb-3">
                <input
                  id={"cat-" + c.id}
                  type="checkbox"
                  className="w-5 h-5 rounded border-slate-300 text-primary"
                  checked={selectedCategories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                />
                <label htmlFor={"cat-" + c.id} className="text-sm text-on-surface-variant cursor-pointer">{c.name}</label>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <label htmlFor="state-filter" className="text-sm font-semibold block mb-4">Estado</label>
            <select
              id="state-filter"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Todos os Estados</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label htmlFor="city-filter" className="text-sm font-semibold block mb-4">Cidade</label>
            <input
              id="city-filter"
              type="text"
              placeholder="Digite a cidade..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
          </div>

          <button
            onClick={clearFilters}
            className="w-full text-sm font-semibold text-primary border border-primary/30 rounded-full py-2.5 hover:bg-primary/5 transition-colors"
          >
            Limpar filtros
          </button>
        </aside>

        <main className="flex-1 md:ml-[300px] p-8 min-h-screen bg-surface">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight mb-2">
                Profissionais
              </h1>
              <p className="text-on-surface-variant text-sm font-medium">
                {professionals.length} profissionais encontrados
                {usingMock ? " (dados de exemplo - back-end indisponivel)" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-on-surface-variant">Carregando...</p>
          ) : professionals.length === 0 ? (
            <p className="text-on-surface-variant">Nenhum profissional encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {professionals.map((pro) => (
                <ProfessionalCard key={pro.slug} professional={pro} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;