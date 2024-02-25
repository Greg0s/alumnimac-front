// Context
import { AuthProvider } from "@/context";
// Components
import { Navbar, Footer } from "@/components/";
// Style
import "./globals.scss";

export const metadata = {
  title: "Alumnimac - Expériences professionnelles d'IMACs",
  description: "Retrouvez les expériences professionnelles des IMACs.",
};

function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
