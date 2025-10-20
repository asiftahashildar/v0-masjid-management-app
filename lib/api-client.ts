const API_BASE = "/api"

export async function apiCall<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: unknown,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "API Error" }))
    throw new Error(error.message || `API Error: ${response.status}`)
  }

  return response.json()
}

// Finance API
export const financeAPI = {
  getExpenses: () => apiCall<any[]>("/finance/expenses"),
  addExpense: (data: any) => apiCall("/finance/expenses", "POST", data),
  deleteExpense: (id: number) => apiCall(`/finance/expenses/${id}`, "DELETE"),
}

// Chanda API
export const chandaAPI = {
  getContributors: () => apiCall<any[]>("/chanda/contributors"),
  addContributor: (data: any) => apiCall("/chanda/contributors", "POST", data),
  deleteContributor: (id: number) => apiCall(`/chanda/contributors/${id}`, "DELETE"),
}

// Jumma Chanda API
export const jummaAPI = {
  getJummaChanda: () => apiCall<any[]>("/chanda/jumma"),
  addJummaChanda: (data: any) => apiCall("/chanda/jumma", "POST", data),
  deleteJummaChanda: (id: number) => apiCall(`/chanda/jumma/${id}`, "DELETE"),
}

// Assets API
export const assetsAPI = {
  getAssets: () => apiCall<any[]>("/assets"),
  addAsset: (data: any) => apiCall("/assets", "POST", data),
  updateAsset: (id: number, data: any) => apiCall(`/assets/${id}`, "PUT", data),
  deleteAsset: (id: number) => apiCall(`/assets/${id}`, "DELETE"),
}

// Committee API
export const committeeAPI = {
  getMembers: () => apiCall<any[]>("/committee"),
  updateMembers: (data: any) => apiCall("/committee", "PUT", data),
}

// Notifications API
export const notificationsAPI = {
  getNotifications: () => apiCall<any[]>("/notifications"),
  addNotification: (data: any) => apiCall("/notifications", "POST", data),
  deleteNotification: (id: number) => apiCall(`/notifications/${id}`, "DELETE"),
}

// Namaz Timings API
export const namazAPI = {
  getTimings: () => apiCall<any[]>("/namaz-timings"),
  updateTimings: (data: any) => apiCall("/namaz-timings", "PUT", data),
}
