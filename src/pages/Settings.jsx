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
              <a className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-600 hover:bg-slate-100" href="#">
                <span className="font-semibold">Pagamentos</span>
              </a>
            </div>
          </aside>

          <section className="flex-grow space-y-8">
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Dados Profissionais</h2>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      Nome Completo
                    </label>
                    <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Ricardo Santos" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      E-mail Profissional
                    </label>
                    <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="ricardo.santos@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      Profissão
                    </label>
                    <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="Editor Senior" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                      Telefone
                    </label>
                    <input className="w-full rounded-xl px-4 py-3 border border-slate-200 bg-slate-50" defaultValue="+55 (11) 98765-4321" />
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button type="button" className="px-8 py-3 rounded-full font-semibold text-slate-500 hover:bg-slate-100">
                    Descartar
                  </button>
                  <button type="submit" className="px-10 py-3 rounded-full font-bold bg-secondary-container text-on-secondary-container shadow-lg hover:scale-105 transition-all">
                    Salvar Perfil
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