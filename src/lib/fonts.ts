import localFont from "next/font/local";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const fontsVariables = {
  geistSans: geistSans.style.fontFamily,
  nunito: nunito.style.fontFamily,
};
export const fonts = {
  body: fontsVariables.geistSans,
  heading: fontsVariables.geistSans,
};
