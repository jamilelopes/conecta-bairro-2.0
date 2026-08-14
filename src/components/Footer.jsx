function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="col-span-1 md:col-span-1">
          <span className="font-headline font-bold text-xl text-violet-700">CONECTA BAIRRO</span>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
            Conectando os melhores profissionais do seu bairro com clientes selecionados.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-6">Plataforma</h4>
          <ul className="space-y-3">
            <li><a className="text-xs text-slate-500 hover:text-violet-600 transition-all hover:underline" href="#">Privacidade</a></li>
            <li><a className="text-xs text-slate-500 hover:text-violet-600 transition-all hover:underline" href="#">Termos de Uso</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-6">Suporte</h4>
          <ul className="space-y-3">
            <li><a className="text-xs text-slate-500 hover:text-violet-600 transition-all hover:underline" href="#">Segurança</a></li>
            <li><a className="text-xs text-slate-500 hover:text-violet-600 transition-all hover:underline" href="#">Centro de Ajuda</a></li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-6">Newsletter</h4>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
  <label htmlFor="newsletter-email" className="sr-only">Seu melhor e-mail</label>
  <input id="newsletter-email" className="bg-white border border-slate-200 rounded-l-xl px-4 py-2.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-primary/20" placeholder="Seu melhor e-mail" type="email" />
  <button type="submit" aria-label="Inscrever-se na newsletter" className="bg-primary text-white px-5 py-2.5 rounded-r-xl transition-all hover:bg-primary-container">
    →
  </button>
</form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200/50 flex justify-between items-center">
        <p className="text-xs text-slate-500">© 2026 Conecta Bairro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;