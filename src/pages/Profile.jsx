import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const { slug } = useParams();

  // TODO: substituir por fetch em GET /professionals/slug/:slug
  const professional = {
    name: "Ricardo Oliveira",
    role: "Especialista em Reformas & Design de Interiores",
    address: "Rua Oscar Freire, Jardins, São Paulo, SP",
    about: "Profissional especializado em transformar espaços residenciais e comerciais com foco em funcionalidade e estética contemporânea.",
    reviews: [
      { rating: 5, text: "Trabalho impecável e muito organizado." },
      { rating: 5, text: "Superou as expectativas, recomendo fortemente." },
    ],
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-28 pb-24">
        <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <main className="space-y-8">
            <section className="bg-primary-fixed rounded-2xl overflow-hidden shadow-sm border border-surface-container-high py-12 px-8 bg-primary-container/10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant text-sm shrink-0">
                  Foto
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">{professional.name}</h1>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                      Profissional Verificado
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-on-surface-variant mb-4">{professional.role}</p>
                  <p className="text-sm text-on-surface-variant/90 font-medium">{professional.address}</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary-container p-8 rounded-2xl text-white shadow-lg">
                <h3 className="font-bold mb-2">Sobre o Profissional</h3>
                <p className="text-sm opacity-90 leading-relaxed">{professional.about}</p>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-surface-container">
                <h3 className="font-headline font-bold mb-4">Avaliações Recentes</h3>
                <div className="space-y-4">
                  {professional.reviews.map((review, i) => (
                    <div key={i} className="border-b pb-3">
                      <div className="text-secondary-container mb-1">{"★".repeat(review.rating)}</div>
                      <p className="text-sm text-on-surface-variant italic">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container">
                <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  Informações de Contato
                </h4>
                <div className="space-y-4 mb-6">
                  <div className="text-sm font-medium">📞 (11) 9****-****</div>
                  <div className="text-sm font-medium">@ricardo_design</div>
                </div>
                <button className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-headline font-extrabold text-lg">
                  Solicitar Orçamento
                </button>
                <p className="text-[11px] text-center text-on-surface-variant mt-4">
                  Informações liberadas após a contratação.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;