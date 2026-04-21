const API_BASE = "http://127.0.0.1:8000";

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function clearSession() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("is_admin");
}

export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearSession();
    return null;
  }

  const json = await res.json().catch(() => ({}));
  if (!json?.access) {
    clearSession();
    return null;
  }

  localStorage.setItem("access", json.access);
  return json.access;
}

export async function authFetch(url, options = {}) {
  const token = getAccessToken();
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let res = await fetch(url, { ...options, headers });
  if (res.status !== 401) return res;

  const refreshed = await refreshAccessToken();
  if (!refreshed) return res;

  const retryHeaders = {
    ...(options.headers || {}),
    Authorization: `Bearer ${refreshed}`,
  };
  res = await fetch(url, { ...options, headers: retryHeaders });
  return res;
}

export function logoutAndRedirect(navigate) {
  clearSession();
  navigate("/login");
}
