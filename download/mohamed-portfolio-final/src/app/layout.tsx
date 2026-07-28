import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamed-metawea-portfolio.netlify.app"),
  title: "Mohamed Mostafa Metawea | AI Engineer Portfolio",
  description: "AI Engineer specializing in Generative AI & Agentic Systems. Expert in Machine Learning, Deep Learning, Computer Vision, and NLP. Building intelligent ML systems with real-world impact.",
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Generative AI", "Computer Vision", "NLP", "Python", "TensorFlow", "PyTorch", "Mohamed Metawea"],
  authors: [{ name: "Mohamed Mostafa Metawea" }],
  icons: {
    icon: "/avatar.png",
  },
  openGraph: {
    title: "Mohamed Mostafa Metawea | AI Engineer",
    description: "AI Engineer specializing in Generative AI & Agentic Systems",
    url: "https://github.com/MOHAMEDMETAWEA",
    siteName: "Mohamed Metawea Portfolio",
    type: "website",
    images: ["/my-photo.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Mostafa Metawea | AI Engineer",
    description: "AI Engineer specializing in Generative AI & Agentic Systems",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
