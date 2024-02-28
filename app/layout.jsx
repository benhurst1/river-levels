import Header from "@/components/header/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="h-screen bg-blue-100">
        <Header />
        {children}
      </body>
    </html>
  );
}
