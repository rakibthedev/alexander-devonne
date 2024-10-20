import localFont from "next/font/local";
import "./globals.css";
import HeaderTop from "./components/HeaderTop";
import HeaderMain from "./components/HeaderMain";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";


const ibmPlexRegular = localFont({
  src: "./fonts/IBMPlexMono-Regular.ttf",
  variable: "--ibm-plex-regular"
});
const ibmPlexMedium = localFont({
  src: "./fonts/IBMPlexMono-Medium.ttf",
  variable: "--ibm-plex-medium"
});
const bookish = localFont({
  src: "./fonts/Bookish-Book.ttf",
  variable: "--bookish",
  weight: "400 500 600",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Alexander Devonne",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${geistSans.variable} ${ibmPlexMedium.variable} ${ibmPlexRegular.variable} ${bookish.variable}`}

      >
        <HeaderTop />
        <HeaderMain />
        {children}
        <Footer />
        <FooterBottom />
      </body>
    </html>
  );
}
