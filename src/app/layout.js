import { Fredoka, Nunito } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s | Zion Pets",
    default: "Zion Pets | Premium Fancy Hens & Pets Breeder",
  },
  description: "Zion Pets specializes in breeding a variety of premium fancy hens, including Bramma and Silkie, and other high-quality pets.",
  keywords: ["Zion Pets", "fancy hens", "poultry breeding", "Bramma hens", "Silkie hens", "pet breeder", "pets shop"],
  openGraph: {
    title: "Zion Pets | Premium Fancy Hens & Pets Breeder",
    description: "Zion Pets specializes in breeding a variety of premium fancy hens, including Bramma and Silkie, and other high-quality pets.",
    url: "https://zionpets.com",
    siteName: "Zion Pets",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${nunito.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <AuthProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
