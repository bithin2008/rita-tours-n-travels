import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { AppProvider } from "@/lib/AppContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import RouteProgress from "@/components/site/RouteProgress";
import ScrollToTop from "@/components/site/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-heading" });

export const metadata = {
  title: "Home — RITA Tours N Travels",
  description: "Personalised European journeys planned around you by RITA Tours N Travels.",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head />
      <body className="antialiased">
        <AuthProvider>
          <AppProvider>
            <RouteProgress />
            <ScrollToTop />
            <SiteHeader />
            {children}
            <SiteFooter />
            <Toaster />
          </AppProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
