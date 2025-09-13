// util/fetchWithAuth.ts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

async function refreshAccessToken() {
  if (!isRefreshing) {
    isRefreshing = true;
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    isRefreshing = false;

    if (!res.ok) throw new Error("Failed to refresh token");
    const data = await res.json();

    refreshSubscribers.forEach((cb) => cb(data.accessToken));
    refreshSubscribers = [];

    return data.accessToken;
  }

  // If a refresh is already happening, queue requests until it's done
  return new Promise<string>((resolve) => {
    refreshSubscribers.push(resolve);
  });
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    // try refresh
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    const refreshData = await refreshRes.json();
    if (refreshRes.ok && refreshData.success) {
      // retry original request
      res = await fetch(url, { ...options, credentials: "include" });
    }
  }

  return res.json();
}
