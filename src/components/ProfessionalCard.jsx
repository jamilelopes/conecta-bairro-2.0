import { useNavigate } from "react-router-dom";

function ProfessionalCard({ professional }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-surface-container-lowest rounded-2xl p-5 border border-transparent hover:border-slate-100 transition-all duration-300 hover:shadow-xl flex flex-col">
      <div role="img" aria-label={`Foto de ${professional.name}`} className="relative h-56 mb-5 overflow-hidden rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant text-sm">
        Foto
    </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">{professional.role}</p>
        <h3 className="font-headline font-bold text-lg text-on-surface mb-1">{professional.name}</h3>
        <div className="flex items-center gap-1.5 text-slate-500 mb-4">
          <span className="text-xs font-medium">{professional.loc}</span>
        </div>
      </div>
      <div className="pt-4 border-t border-slate-50 flex items-center justify-end">
        <button
          onClick={() => navigate(`/profile/${professional.slug}`)}
          className="bg-primary text-white text-sm font-bold py-2.5 px-5 rounded-xl hover:bg-primary-container shadow-md"
        >
          Ver Perfil
        </button>
      </div>
    </div>
  );
}

export default ProfessionalCard;