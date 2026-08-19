import { API_BASE_URL } from "./api";
import { getAccessToken, getRefreshToken, saveAuthTokens, clearAuthTokens } from "./auth";

async function authFetch(url, options = {}) {
  const doFetch = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  let response = await doFetch(getAccessToken());

  if (response.status === 401) {
    const body = await response.clone().json().catch(() => null);

    if (body?.code === "TOKEN_EXPIRED") {
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: getRefreshToken() }),
      });

      if (refreshResponse.ok) {
        const tokens = await refreshResponse.json();
        saveAuthTokens(tokens.access_token, tokens.refresh_token);
        response = await doFetch(tokens.access_token);
      } else {
        clearAuthTokens();
      }
    }
  }

  return response;
}

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
  const response = await authFetch(`${API_BASE_URL}/professionals/me`);
  if (!response.ok) throw new Error("Erro ao buscar perfil");
  return response.json();
}

export async function uploadAvatar(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await authFetch(`${API_BASE_URL}/upload/avatar`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Erro ao enviar foto");
  return response.json();
}

export async function updateMyProfile(data) {
  const response = await authFetch(`${API_BASE_URL}/professionals/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
export async function getCurrentUser() {
  const response = await authFetch(`${API_BASE_URL}/users/me`);
  if (!response.ok) throw new Error("Erro ao buscar usuário atual");
  return response.json();
}