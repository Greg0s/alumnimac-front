import "./globals.scss";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AuthProvider from "./utils/authContext";

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
