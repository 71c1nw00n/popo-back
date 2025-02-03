import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Footer = () => {
  return (
    <footer className="bg-[#CFCFED] text-black mt-10 py-6">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-sm">© 2025 POPO. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export const metadata = {
  title: "POPO.",
  description: "Generated test",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
