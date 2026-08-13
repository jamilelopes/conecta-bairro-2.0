import { API_BASE_URL } from "./api";

export async function getFeaturedProfessionals() {
  const response = await fetch(`${API_BASE_URL}/professionals/featured`);
  if (!response.ok) throw new Error("Erro ao buscar profissionais em destaque");
  return response.json();
}

export async function getProfessionals(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/professionals?${params}`);
  if (!response.ok) throw new Error("Erro ao buscar profissionais");
  return response.json();
}

export async function getProfessionalBySlug(slug) {
  const response = await fetch(`${API_BASE_URL}/professionals/slug/${slug}`);
  if (!response.ok) throw new Error("Profissional não encontrado");
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Erro ao buscar categorias");
  return response.json();
}