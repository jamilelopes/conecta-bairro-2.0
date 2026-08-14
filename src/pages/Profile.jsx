import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfessionalBySlug } from "../services/professionalsService";

const mockProfessional = {
  name: "Marcos Silva",
  role: "Arquiteto e Reformas",
  registration: "CAU-A123456-7",
  address: "Rua Cardeal Arcoverde, 1234, Pinheiros, São Paulo, SP",
  about: "Profissional especializado em reformas residenciais e comerciais com foco em funcionalidade e estetica contemporanea. Mais de 10 anos de experiencia no mercado paulistano.",
  instagram: "marcos_arq",
  site: "marcossilva.arq.br",
  phone: "5511991234567",
};

function Profile() {
  const { slug } = useParams();
  const [professional, setProfessional] = useState(mockProfessional);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    getProfessionalBySlug(slug)
      .then((data) => {
        setProfessional(data);
        setLoading(false);
      })
      .catch(() => {
        setUsingMock(true);
        setLoading(false);
      });
  }, [slug]);

  const whatsappMessage = encodeURIComponent(
    "Ola " + professional.name + ", vi seu perfil no Conecta Bairro e gostaria de solicitar um orcamento."
  );
  const whatsappLink = "https://api.whatsapp.com/send?phone=" + professional.phone + "&text=" + whatsappMessage;

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-28 pb-24">
        {usingMock && (
          <p className="text-center text-xs text-on-surface-variant mb-6">
            (dados de exemplo - back-end indisponivel)
          </p>
        )}
        <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <main className="space-y-8">
            <section className="rounded-2xl overflow-hidden shadow-sm border border-surface-container-high py-12 px-8 bg-primary-container/10">
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
                  <p className="text-xl font-semibold text-on-surface-variant mb-2">{professional.role}</p>
                  <p className="text-sm text-on-surface-variant/80 mb-1">Registro: {professional.registration}</p>
                  <p className="text-sm text-on-surface-variant/90 font-medium">{professional.address}</p>
                </div>
              </div>
            </section>

            <section className="bg-primary-container p-8 rounded-2xl text-white shadow-lg">
              <h3 className="font-bold mb-2">Sobre o Profissional</h3>
              <p className="text-sm opacity-90 leading-relaxed">{professional.about}</p>
            </section>
          </main>

          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container">
                <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  Informacoes de Contato
                </h4>
                <div className="space-y-3 mb-6 text-sm font-medium">
                  <p>@{professional.instagram}</p>
                  <p>{professional.site}</p>
                </div>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-headline font-extrabold text-lg flex items-center justify-center gap-2">
                  Solicitar Orcamento
                </a>
                <p className="text-[11px] text-center text-on-surface-variant mt-4">
                  Contato via WhatsApp direto com o profissional.
                </p>
              </div>

              <div className="flex justify-between text-xs text-on-surface-variant px-2">
                <button className="hover:underline">Compartilhar</button>
                <button className="hover:underline">Denunciar</button>
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