import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ProductsProvider } from "./context/ProductsContext";
import PageWrapper from "./components/RootProviders";
import { ProjectsProvider } from "./context/ProjectsContext";

// Google font
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800"],
});

// Metadata for the site
export const metadata = {
  title: "Prime Energy - Solar Solutions",
  description: "Prime Energy specializes in solar panel sales and renewable energy solutions.",
  keywords: ["Prime Energy", "solar panels", "solar energy", "renewable energy", "solar solutions"],
  authors: [{ name: "Prime Energy" }],
  openGraph: {
    title: "Prime Energy - Solar Solutions",
    description: "Prime Energy specializes in solar panel sales and renewable energy solutions.",
    url: "https://www.primeenergy.com", // replace with actual URL
    siteName: "Prime Energy",
    images: [
      {
        url: "/favicon.ico", // you can use your logo here
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Energy - Solar Solutions",
    description: "Prime Energy specializes in solar panel sales and renewable energy solutions.",
    creator: "@PrimeEnergy", // optional
  },
  icons: {
    icon: "/logo.png", // favicon path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} antialiased`}>
        <ProjectsProvider>
          <ProductsProvider>
            <PageWrapper>{children}</PageWrapper>
          </ProductsProvider>
        </ProjectsProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
