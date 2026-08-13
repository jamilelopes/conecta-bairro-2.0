import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfessionals } from "../services/professionalsService";

const mockProfessionals = [
  { name: "Ricardo Oliveira", role: "Especialista em Reformas", loc: "São Paulo, SP", slug: "ricardo-oliveira" },
  { name: "Helena Mendes", role: "Arquitetura de Interiores", loc: "Curitiba, PR", slug: "helena-mendes" },
  { name: "Marcos Santos", role: "Instalações Elétricas", loc: "Belo Horizonte, MG", slug: "marcos-santos" },
  { name: "André Costa", role: "Pintura Comercial", loc: "Rio de Janeiro, RJ", slug: "andre-costa" },
  { name: "Juliana Paes", role: "Paisagismo & Botânica", loc: "Porto Alegre, RS", slug: "juliana-paes" },
  { name: "Carlos Eduardo", role: "Limpeza Profissional", loc: "Brasília, DF", slug: "carlos-eduardo" },
];

function Explore() {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    getProfessionals()
      .then((data) => {
        setProfessionals(data);
        setLoading(false);
      })
      .catch(() => {
        // Back-end indisponível: mantém os dados mockados como fallback
        setUsingMock(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex pt-20">
        <aside className="w-[300px] h-[calc(100vh-80px)] fixed left-0 overflow-y-auto border-r border-slate-200/50 bg-white p-8 hidden md:block">
          <h2 className="font-headline font-bold text-lg mb-8 tracking-tight">Filtros</h2>
          <div className="mb-8">
            <span className="text-sm font-semibold block mb-4">Categorias</span>
            {["Reformas", "Educação", "Beleza", "TI & Software"].map((c) => (
              <label key={c} className="flex items-center gap-3 mb-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-primary" defaultChecked={c === "Reformas"} />
                <span className="text-sm text-on-surface-variant group-hover:text-on-surface">{c}</span>
              </label>
            ))}
          </div>
          <div className="mb-8">
            <span className="text-sm font-semibold block mb-4">Estado</span>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm">
              <option>Todos os Estados</option>
              <option>São Paulo</option>
            </select>
          </div>
        </aside>

        <main className="flex-1 md:ml-[300px] p-8 min-h-screen bg-surface">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight mb-2">
                Resultados para Reformas
              </h1>
              <p className="text-on-surface-variant text-sm font-medium">
                {professionals.length} profissionais encontrados
                {usingMock && " (dados de exemplo — back-end indisponível)"}
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-on-surface-variant">Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {professionals.map((pro) => (
                <div
                  key={pro.slug}
                  className="group bg-surface-container-lowest rounded-2xl p-5 border border-transparent hover:border-slate-100 transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  <div className="relative h-56 mb-5 overflow-hidden rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
                    Foto
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">{pro.role}</p>
                    <h3 className="font-headline font-bold text-lg text-on-surface mb-1">{pro.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 mb-4">
                      <span className="text-xs font-medium">{pro.loc}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-end">
                    <button
                      onClick={() => navigate(`/profile/${pro.slug}`)}
                      className="bg-primary text-white text-sm font-bold py-2.5 px-5 rounded-xl hover:bg-primary-container shadow-md"
                    >
                      Ver Perfil
                    </button>
                  </div>
                </div>
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