import { useNavigate } from "react-router-dom";

function ProfessionalCard({ professional }) {
  const navigate = useNavigate();
  const location = [professional.city, professional.state].filter(Boolean).join(", ");
  const categories = professional.categories || [];

  return (
    <div className="group bg-surface-container-lowest rounded-2xl p-5 border border-transparent hover:border-slate-100 transition-all duration-300 hover:shadow-xl flex flex-col">
      {professional.avatar_url ? (
        <img
          src={professional.avatar_url}
          alt={"Foto de " + professional.name}
          className="h-56 mb-5 overflow-hidden rounded-xl object-cover w-full"
        />
      ) : (
        <div role="img" aria-label={"Foto de " + professional.name} className="h-56 mb-5 overflow-hidden rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
          Foto
        </div>
      )}

      <div className="flex-1 space-y-1.5">
        <h3 className="font-headline font-bold text-lg text-on-surface">{professional.name}</h3>
        <p className="text-sm text-primary font-semibold">{professional.title}</p>
        <div className="flex items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined text-sm" aria-hidden="true">location_on</span>
          <span className="text-xs font-medium">{location}</span>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <span key={cat} className="text-[10px] font-semibold bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-end">
        <button
          onClick={() => navigate("/profile/" + professional.slug)}
          className="bg-primary text-white text-sm font-bold py-2.5 px-5 rounded-xl hover:bg-primary-container shadow-md"
        >
          Ver Perfil
        </button>
      </div>
    </div>
  );
}

export default ProfessionalCard;