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
  metadataBase: new URL("https://mohamed-mostafa-metawea.vercel.app"),
  title: "Mohamed Mostafa Metawea | AI Engineer Portfolio",
  description: "Mohamed Mostafa Metawea is an AI Engineer building practical machine learning, generative AI, RAG, and agentic systems.",
  alternates: { canonical: "/" },
  keywords: ["AI Engineer", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Computer Vision", "NLP", "Python", "TensorFlow", "Mohamed Metawea", "MedAgent", "n8n"],
  authors: [{ name: "Mohamed Mostafa Metawea" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/avatar.png",
    apple: "/avatar.png",
  },
  openGraph: {
    title: "Mohamed Mostafa Metawea | AI Engineer & Agentic Systems Specialist",
    description: "AI Engineer specializing in Generative AI, RAG Architectures, and Autonomous Agentic Systems.",
    url: "https://mohamed-mostafa-metawea.vercel.app",
    siteName: "Mohamed Metawea Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Mostafa Metawea | AI Engineer",
    description: "AI Engineer specializing in Generative AI & Agentic Systems",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mohamed Mostafa Metawea",
  "jobTitle": "AI Engineer",
  "email": "mohamedmostafametawea@gmail.com",
  "telephone": "+201055485561",
  "url": "https://mohamed-mostafa-metawea.vercel.app",
  "sameAs": [
    "https://github.com/MOHAMEDMETAWEA",
    "https://www.linkedin.com/in/mohamed-mostafa-metawea"
  ],
  "knowsAbout": [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Agentic Systems",
    "Computer Vision",
    "Natural Language Processing",
    "n8n Automation",
    "RAG Systems"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "October 6 University"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script
          dangerouslySetInnerHTML={{ __html: "window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)}" }}
        />
        <script defer src="/_vercel/insights/script.js" />
        <script defer src="/_vercel/speed-insights/script.js" />
      </body>
    </html>
  );
}
