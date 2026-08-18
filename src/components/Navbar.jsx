import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccessToken } from "../services/auth";
import { getCurrentUser } from "../services/professionalsService";
import { useUnsavedChanges } from "../contexts/UnsavedChangesContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { guardNavigate } = useUnsavedChanges();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  function handleSearch() {
    guardNavigate(`/explore${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ""}`);
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20">
      <div className="flex justify-between items-center w-full px-8 h-full max-w-[1920px] mx-auto">
        <button
          onClick={() => guardNavigate("/")}
          className="text-2xl font-bold tracking-tight text-violet-700 font-headline cursor-pointer"
        >
          CONECTA BAIRRO
        </button>

        <div className="flex-1 flex justify-center px-8">
          <div className="flex items-center gap-3 bg-surface-container-low rounded-xl pl-4 pr-1.5 py-1.5 w-full max-w-md">
            <span className="material-symbols-outlined text-outline text-lg shrink-0" aria-hidden="true">search</span>
            <label htmlFor="navbar-search" className="sr-only">Buscar profissionais pelo nome</label>
            <input
              id="navbar-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Buscar profissionais pelo nome..."
              className="bg-transparent border-none focus:ring-0 w-full outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              aria-label="Buscar"
              className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 cursor-pointer hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!isHome && (
            <button
              onClick={() => guardNavigate("/")}
              className="text-slate-600 font-headline font-semibold hover:text-violet-600 hover:underline underline-offset-8 decoration-2 transition-colors hidden md:block cursor-pointer"
            >
              Início
            </button>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => guardNavigate("/settings")}
              className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold overflow-hidden shrink-0 cursor-pointer"
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
              <button onClick={() => navigate("/login")} className="text-slate-600 font-headline font-semibold hover:text-violet-600 hover:underline underline-offset-8 decoration-2 transition-colors cursor-pointer">
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