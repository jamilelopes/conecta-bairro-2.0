import { API_BASE_URL } from "./api";
import { getAccessToken } from "./auth";

export async function getFeaturedProfessionals() {
  const response = await fetch(`${API_BASE_URL}/professionals/featured`);
  if (!response.ok) throw new Error("Erro ao buscar profissionais em destaque");
  return response.json();
}

export async function getProfessionals(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/professionals?${params}`);
  if (!response.ok) throw new Error("Erro ao buscar profissionais");
  const result = await response.json();
  return result.data;
}

export async function getProfessionalBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/professionals/slug/${slug}`);
  if (!response.ok) throw new Error("Profissional não encontrado");
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  const result = await response.json();
  return result.data;
}

export async function getMyProfile() {
  const response = await fetch(`${API_BASE_URL}/professionals/me`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  if (!response.ok) throw new Error("Erro ao buscar perfil");
  return response.json();
}

export async function updateMyProfile(data) {
  const response = await fetch(`${API_BASE_URL}/professionals/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Erro ao salvar perfil");
  return response.json();
}
export async function googleLogin(googleToken, userType = "client") {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ googleToken, userType }),
  });
  if (!response.ok) throw new Error("Erro ao fazer login com Google");
  return response.json();
}