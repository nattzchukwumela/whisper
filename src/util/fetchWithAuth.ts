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
  let token = localStorage.getItem("accessToken");

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  let res = await fetch(url, { ...options, headers });

  // If access token expired, attempt refresh
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshRes = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with new token
        res = await fetch(url, {
          ...options,
          headers: { ...headers, Authorization: `Bearer ${data.accessToken}` },
        });
      }
    }
  }

  return res;
}
