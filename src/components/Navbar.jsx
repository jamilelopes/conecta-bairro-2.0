import { Link, useNavigate } from "react-router-dom";

function Navbar({ variant = "full" }) {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-sm h-20">
      <div className="flex justify-between items-center w-full px-8 h-full max-w-[1920px] mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-violet-700 font-headline">
          CONECTA BAIRRO
        </Link>
        {variant === "full" && (
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">
              Explorar Profissionais
            </Link>
            <a href="#" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">Como Funciona</a>
            <a href="#" className="text-slate-600 font-headline font-semibold hover:text-violet-600 transition-colors">Preços</a>
          </nav>
        )}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="text-slate-600 font-semibold px-4 py-2 hover:text-violet-600 transition-colors">
            Entrar
          </button>
          <button onClick={() => navigate("/settings")} className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:scale-95 transition-transform duration-200">
            Seja um Profissional
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;