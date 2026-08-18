import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnsavedChangesContext = createContext(null);

export function UnsavedChangesProvider({ children }) {
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  function guardNavigate(path) {
    if (isDirty && !window.confirm("Você tem alterações não salvas. Sair mesmo assim?")) {
      return;
    }
    navigate(path);
  }

  return (
    <UnsavedChangesContext.Provider value={{ isDirty, setIsDirty, guardNavigate }}>
      {children}
    </UnsavedChangesContext.Provider>
  );
}

export function useUnsavedChanges() {
  return useContext(UnsavedChangesContext);
}