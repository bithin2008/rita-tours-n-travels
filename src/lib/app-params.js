const isBrowser = typeof window !== "undefined";

export function getAppParams() {
  return {
    appId: process.env.NEXT_PUBLIC_BASE44_APP_ID || "base44-app",
    token: isBrowser ? localStorage.getItem("base44_access_token") : null,
    functionsVersion: process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION,
    appBaseUrl: process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL,
  };
}
