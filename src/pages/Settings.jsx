import { useState, useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../services/professionalsService";

const mockProfile = {
  name: "Marcos Silva",
  email: "marcos@conectabairro.com.br",
  phone: "(11) 99123-4567",
  state: "SP",
  city: "São Paulo",
  neighborhood: "Pinheiros",
  street: "Rua Cardeal Arcoverde",
  number: "1234",
  role: "Arquiteto e Reformas",
  registration: "CAU-A123456-7",
  about: "Profissional especializado em reformas residenciais e comerciais com foco em funcionalidade e estetica contemporanea. Mais de 10 anos de experiencia no mercado paulistano.",
  instagram: "@marcos_arq",
  site: "marcossilva.arq.br",
};

function Settings() {
  const [form, setForm] = useState(mockProfile);
  const [usingMock, setUsingMock] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((data) => setForm(data))
      .catch(() => setUsingMock(true));
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    updateMyProfile(form)
      .then(() => setSaveMessage("Perfil salvo com sucesso!"))
      .catch(() => setSaveMessage("Não foi possível salvar agora (back-end indisponível)."))
      .finally(() => setSaving(false));
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20 flex items-center px-8">
        <span className="text-2xl font-bold tracking-tight text-primary font-headline">CONECTA BAIRRO</span>
      </header>
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-80 shrink-0">
            <div className="sticky top-28 space-y-2">
              <h1 className="font-headline text-2xl font-bold mb-6 tracking-tight px-4">Configurações</h1>
              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-primary-container text-white shadow-lg" href="#">
                <span className="font-semibold">Dados Pessoais</span>
              </a>
            </div>
          </aside>

          <section className="flex-grow space-y-8">
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-2">Dados Profissionais</h2>
              <p className="text-sm text-on-surface-variant mb-2">
                Mantenha suas informações atualizadas para garantir a conformidade do seu cadastro.
              </p>
              {usingMock && (
                <p className="text-xs text-on-surface-variant mb-6">(dados de exemplo - back-end indisponível)</p>
              )}

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                    Informações Principais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Nome Completo</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">E-mail</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Telefone</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Estado</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.state} onChange={(e) => handleChange("state", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Cidade</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Bairro</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.neighborhood} onChange={(e) => handleChange("neighborhood", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Rua</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.street} onChange={(e) => handleChange("street", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Número</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.number} onChange={(e) => handleChange("number", e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Dados Profissionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Título / Profissão</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.role} onChange={(e) => handleChange("role", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Registro Profissional</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.registration} onChange={(e) => handleChange("registration", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Sobre Você</label>
                    <textarea className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50 min-h-24" value={form.about} onChange={(e) => handleChange("about", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Instagram</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.instagram} onChange={(e) => handleChange("instagram", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Site</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.site} onChange={(e) => handleChange("site", e.target.value)} />
                    </div>
                  </div>
                </div>

                {saveMessage && (
                  <p className="text-sm text-center text-on-surface-variant">{saveMessage}</p>
                )}

                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button type="button" className="px-8 py-3 rounded-full font-semibold text-slate-500 hover:bg-slate-100">
                    Descartar Alterações
                  </button>
                  <button type="submit" disabled={saving} className="px-10 py-3 rounded-full font-bold bg-secondary-container text-on-secondary-container shadow-lg hover:scale-105 transition-all disabled:opacity-50">
                    {saving ? "Salvando..." : "Salvar Perfil Profissional"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Settings;