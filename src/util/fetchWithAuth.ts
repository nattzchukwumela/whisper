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
  let res = await fetch(url, {
    ...options,
    credentials: "include", // send cookies (refresh token cookie)
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      localStorage.setItem("accessToken", newToken);

      res = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } catch (err) {
      console.error("Session expired, redirect to login", err);
      window.location.href = "/auth"; // fallback
    }
  }

  return res;
}
