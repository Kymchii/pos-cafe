import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthStoreProvider from "@/providers/auth-store-provider";
import { cookies } from "next/headers";
import ReactQueryProvider from "@/providers/react-query-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const profile = JSON.parse(cookiesStore.get("user_profile")?.value ?? "{}");
  return (
    <html
      lang="en"
      className={cn("font-mono", jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthStoreProvider profile={profile}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
