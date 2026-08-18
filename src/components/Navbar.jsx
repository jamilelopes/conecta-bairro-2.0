import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccessToken } from "../services/auth";
import { getCurrentUser } from "../services/professionalsService";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const isHome = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const loggedIn = !!getAccessToken();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      getCurrentUser()
        .then(setCurrentUser)
        .catch(() => setCurrentUser(null));
    }
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20">
      <div className="flex justify-between items-center w-full px-8 h-full max-w-[1920px] mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-violet-700 font-headline">
          CONECTA BAIRRO
        </Link>

        <div className="flex-1 flex justify-center px-8">
            <div className="flex items-center gap-3 bg-surface-container-low rounded-xl px-4 py-2.5 w-full max-w-md">
              <span className="material-symbols-outlined text-outline text-lg" aria-hidden="true">search</span>
              <label htmlFor="navbar-search" className="sr-only">Buscar profissionais pelo nome</label>
              <input
                id="navbar-search"
                type="text"
                placeholder="Buscar profissionais pelo nome..."
                className="bg-transparent border-none focus:ring-0 w-full outline-none text-sm"
              />
            </div>
          </div>

        <div className="flex items-center gap-6">
          {!isHome && (
            <Link to="/" className="text-slate-600 font-headline font-semibold hover:text-violet-600 hover:underline underline-offset-8 decoration-2 transition-colors hidden md:block">
              Início
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => navigate("/settings")}
              className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold overflow-hidden shrink-0"
              aria-label="Abrir configurações da conta"
            >
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "?"
              )}
            </button>
          ) : (
            !isLoginPage && (
              <button onClick={() => navigate("/login")} className="text-slate-600 font-headline font-semibold hover:text-violet-600 hover:underline underline-offset-8 decoration-2 transition-colors">
                Entrar
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;