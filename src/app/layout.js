import localFont from "next/font/local";
import "./globals.css";
import HeaderTop from "./components/HeaderTop";
import HeaderMain from "./components/HeaderMain";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";
import { CartProvider } from "@/app/context/cartContext";
import BagPopup from "./components/bag-popup/BagPopup";
import { WishProvider } from "./context/wishContext";
import NextTopLoader from "nextjs-toploader";
import LoadingIndicator from "./components/LoadingIndicator";
import WishlistPopup from './components/wishlist-popup/WishlistPopup';
import { LoginProvider } from "./context/loginContext";
import { NotificationProvider } from "./context/notificationContext";
import NotificationPopup from "@/app/components/custom-notification/NotificationPopup"
const ibmPlexRegular = localFont({
  src: "./fonts/IBMPlexMono-Regular.ttf",
  variable: "--ibm-plex-regular"
});
const ibmPlexMedium = localFont({
  src: "./fonts/IBMPlexMono-Medium.ttf",
  variable: "--ibm-plex-medium"
});
const ibmPlexSemiBold = localFont({
  src: "./fonts/IBMPlexMono-SemiBold.ttf",
  variable: "--ibm-plex-semi-bold"
});
const ibmPlexBold = localFont({
  src: "./fonts/IBMPlexMono-Bold.ttf",
  variable: "--ibm-plex-bold"
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
        className={`${geistMono.variable} ${geistSans.variable} ${ibmPlexMedium.variable} ${ibmPlexRegular.variable} ${ibmPlexSemiBold.variable} ${ibmPlexBold.variable} ${bookish.variable}`}
      >
        {/* <NextTopLoader /> */}
        {/* <LoadingIndicator /> */}
        <CartProvider>
          <WishProvider>
            <LoginProvider>
              <NotificationProvider>
                  <NotificationPopup />
                  <BagPopup />
                  <WishlistPopup />
                  <HeaderTop />
                  <HeaderMain />
                  {children}
                  <Footer />
                  <FooterBottom />
              </NotificationProvider>
            </LoginProvider>
          </WishProvider>
        </CartProvider>

      </body>
    </html>
  );
}
