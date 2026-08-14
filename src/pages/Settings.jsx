function Settings() {
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
              <p className="text-sm text-on-surface-variant mb-8">
                Mantenha suas informações atualizadas para garantir a conformidade do seu cadastro.
              </p>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                    Informações Principais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Nome Completo</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Marcos Silva" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">E-mail</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="marcos@conectabairro.com.br" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Telefone</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="(11) 99123-4567" />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Estado</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="SP" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Cidade</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="São Paulo" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Bairro</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Pinheiros" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Rua</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Rua Cardeal Arcoverde" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Número</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="1234" />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Dados Profissionais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Título / Profissão</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Arquiteto e Reformas" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Registro Profissional</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="CAU-A123456-7" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Sobre Você</label>
                    <textarea
                      className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50 min-h-24"
                      defaultValue="Profissional especializado em reformas residenciais e comerciais com foco em funcionalidade e estética contemporânea. Mais de 10 anos de experiência no mercado paulistano."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Instagram</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="@marcos_arq" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Site</label>
                      <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="marcossilva.arq.br" />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button type="button" className="px-8 py-3 rounded-full font-semibold text-slate-500 hover:bg-slate-100">
                    Descartar Alterações
                  </button>
                  <button type="submit" className="px-10 py-3 rounded-full font-bold bg-secondary-container text-on-secondary-container shadow-lg hover:scale-105 transition-all">
                    Salvar Perfil Profissional
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