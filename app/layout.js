import "./globals.css";
import Navbar from "./components/navbar";
import AuthProvider from "./utils/authContext";

export const metadata = {
  title: "Alumnimac",
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
      </body>
    </html>
  );
}

export default RootLayout;
