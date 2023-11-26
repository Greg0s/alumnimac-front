import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import AuthProvider from "./utils/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alumnimac",
  description: "Retrouvez les expériences professionnelles des IMACs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
