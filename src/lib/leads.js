export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? "");
}

export function createLead(payload) {
  return { id: "mock-" + Date.now() };
}
