// Initialize storage with data from localStorage or return empty data
function getStorageData(key: string, defaultValue: any = []) {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`masjid_${key}`)
    return stored ? JSON.parse(stored) : defaultValue
  }
  // Server-side fallback - use in-memory storage
  return defaultValue
}

// Save data to localStorage
function setStorageData(key: string, data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem(`masjid_${key}`, JSON.stringify(data))
  }
}

// Get all stored data
export function getAllStorageData() {
  if (typeof window !== "undefined") {
    return {
      expenses: getStorageData("expenses", []),
      contributors: getStorageData("contributors", []),
      jummaChanda: getStorageData("jummaChanda", []),
      assets: getStorageData("assets", []),
      committee: getStorageData("committee", { leader: "", accountant: "", members: [] }),
      notifications: getStorageData("notifications", []),
      namazTimings: getStorageData("namazTimings", []),
    }
  }
  return {}
}

export { getStorageData, setStorageData }
