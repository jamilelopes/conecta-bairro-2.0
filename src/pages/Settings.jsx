import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyProfile, updateMyProfile } from "../services/professionalsService";
import { clearAuthTokens } from "../services/auth";

const mockProfile = {
  name: "Marcos Silva",
  email: "marcos@conectabairro.com.br",
  phone: "(11) 99123-4567",
  state: "SP",
  city: "São Paulo",
  district: "Pinheiros",
  street: "Rua Cardeal Arcoverde",
  number: "1234",
  title: "Arquiteto e Reformas",
  registration_number: "CAU-A123456-7",
  description: "Profissional especializado em reformas residenciais e comerciais com foco em funcionalidade e estetica contemporanea. Mais de 10 anos de experiencia no mercado paulistano.",
  instagram: "@marcos_arq",
  website: "marcossilva.arq.br",
  avatar_url: "https://randomuser.me/api/portraits/med/men/32.jpg",
};

function Settings() {
  const navigate = useNavigate();
  const [form, setForm] = useState(mockProfile);
  const [originalForm, setOriginalForm] = useState(mockProfile);
  const [usingMock, setUsingMock] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setForm(data);
        setOriginalForm(data);
      })
      .catch(() => setUsingMock(true));
  }, []);

  const isDirty = JSON.stringify(form) !== JSON.stringify(originalForm);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePhotoClick() {
    fileInputRef.current?.click();
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    handleChange("avatar_url", previewUrl);
    // TODO: no futuro, enviar o arquivo de verdade para o back-end (upload real)
  }

  function handleLogout() {
    if (isDirty && !window.confirm("Você tem alterações não salvas. Sair mesmo assim?")) return;
    clearAuthTokens();
    navigate("/");
  }

  function handleDiscard() {
    if (!isDirty) return;
    if (!window.confirm("Descartar todas as alterações não salvas?")) return;
    setForm(originalForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    updateMyProfile(form)
      .then((data) => {
        setSaveMessage("Perfil salvo com sucesso!");
        setOriginalForm(data);
      })
      .catch(() => setSaveMessage("Não foi possível salvar agora (back-end indisponível)."))
      .finally(() => setSaving(false));
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <nav aria-label="Menu de configurações" className="w-full md:w-80 shrink-0">
            <div className="sticky top-28 space-y-2">
              <h1 className="font-headline text-2xl font-bold mb-6 tracking-tight px-4">Configurações</h1>
              <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-primary-container text-white shadow-lg">
                <span className="material-symbols-outlined" aria-hidden="true">person</span>
                <span className="font-semibold">Dados Pessoais</span>
              </div>

              {form.slug && (
                <Link
                  to={`/profile/${form.slug}`}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-on-surface-variant hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">visibility</span>
                  <span className="font-semibold">Ver Perfil Público</span>
                </Link>
              )}
            </div>
          </nav>

          <section className="flex-grow space-y-8" aria-labelledby="settings-heading">
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <img
                    src={form.avatar_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(form.name)}
                    alt={"Foto de " + form.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    aria-label="Trocar foto de perfil"
className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md cursor-pointer"                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">photo_camera</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
                <div>
                  <h2 id="settings-heading" className="font-headline text-3xl font-bold tracking-tight">Meu Perfil</h2>
                  <p className="text-sm text-on-surface-variant">
                    Mantenha suas informações atualizadas para garantir a conformidade do seu cadastro.
                  </p>
                </div>
              </div>

              {usingMock && (
                <p className="text-xs text-on-surface-variant mb-6">(dados de exemplo - back-end indisponível)</p>
              )}

              <form className="space-y-8" onSubmit={handleSubmit}>
                <fieldset>
                  <legend className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                    <span className="material-symbols-outlined text-base" aria-hidden="true">badge</span>
                    Informações Principais
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Nome Completo</label>
                      <input id="name" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">E-mail</label>
                      <input id="email" type="email" disabled className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" value={form.email} />
                      <p className="text-xs text-on-surface-variant">Vinculado à sua conta Google, não pode ser alterado.</p>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Telefone</label>
                      <input id="phone" type="tel" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="pt-8 border-t border-slate-100">
                  <legend className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                    <span className="material-symbols-outlined text-base" aria-hidden="true">location_on</span>
                    Endereço
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Estado</label>
                      <input id="state" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.state} onChange={(e) => handleChange("state", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Cidade</label>
                      <input id="city" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="district" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Bairro</label>
                      <input id="district" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.district} onChange={(e) => handleChange("district", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label htmlFor="street" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Rua</label>
                      <input id="street" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.street} onChange={(e) => handleChange("street", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="number" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Número</label>
                      <input id="number" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.number} onChange={(e) => handleChange("number", e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="pt-8 border-t border-slate-100">
                  <legend className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                    <span className="material-symbols-outlined text-base" aria-hidden="true">work</span>
                    Dados Profissionais
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Título / Profissão</label>
                      <input id="title" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="registration_number" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Registro Profissional</label>
                      <input id="registration_number" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.registration_number} onChange={(e) => handleChange("registration_number", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Sobre Você</label>
                    <textarea id="description" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50 min-h-24" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label htmlFor="instagram" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Instagram</label>
                      <input id="instagram" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.instagram} onChange={(e) => handleChange("instagram", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Site</label>
                      <input id="website" className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" value={form.website} onChange={(e) => handleChange("website", e.target.value)} />
                    </div>
                  </div>
                </fieldset>

                {saveMessage && (
                  <p role="status" className="text-sm text-center text-on-surface-variant">{saveMessage}</p>
                )}

                <div className="pt-8 border-t border-slate-100 flex justify-between items-center gap-4">
                  <button type="button" onClick={handleLogout} className="px-8 py-3 rounded-full font-semibold text-slate-500 hover:bg-slate-100">
                    Sair da Conta
                  </button>
                  <div className="flex gap-4">
                    <button type="button" onClick={handleDiscard} disabled={!isDirty} className={`px-8 py-3 rounded-full font-semibold transition-colors ${isDirty ? "text-primary hover:bg-slate-100" : "text-slate-300 cursor-not-allowed"}`}>
                      Descartar Alterações
                    </button>
                    <button type="submit" disabled={saving || !isDirty} className="px-10 py-3 rounded-full font-bold bg-secondary-container text-on-secondary-container shadow-lg hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                      {saving ? "Salvando..." : "Salvar Perfil"}
                    </button>
                  </div>
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