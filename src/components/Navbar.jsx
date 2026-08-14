import { Link, useNavigate } from "react-router-dom";

function Navbar({ variant = "full", isLoggedIn = false }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20">
      <div className="flex justify-between items-center w-full px-8 h-full max-w-[1920px] mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-violet-700 font-headline">
          CONECTA BAIRRO
        </Link>

        {isLoggedIn ? (
          <div className="flex-1 flex justify-center px-8">
            <div className="flex items-center gap-3 bg-surface-container-low rounded-xl px-4 py-2.5 w-full max-w-md">
              <span className="material-symbols-outlined text-outline text-lg" aria-hidden="true">search</span>
                <label htmlFor="navbar-search" className="sr-only">Buscar profissionais</label>
                <input
                  id="navbar-search"
                  type="text"
                  placeholder="Buscar profissionais..."
                  className="bg-transparent border-none focus:ring-0 w-full outline-none text-sm"
                />
            </div>
          </div>
        ) : (
          variant === "full" && (
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/explore" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">
                Explorar Profissionais
              </Link>
              <a href="#" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">Como Funciona</a>
              <a href="#" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">Preços</a>
            </nav>
          )
        )}

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/settings")}
              className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold"
              aria-label="Abrir configurações da conta"
            >
              M
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="text-slate-600 font-semibold px-4 py-2 hover:text-violet-600 transition-colors">
                Entrar
              </button>
              <button onClick={() => navigate("/settings")} className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:scale-95 transition-transform duration-200">
                Seja um Pro
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;