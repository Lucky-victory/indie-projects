import { fonts } from "@/lib/fonts";
import AppProviders from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --app-heading-font: ${fonts.heading};
            --app-body-font: ${fonts.body};
          }
        `}
      </style>
      <AppProviders>
        <Component {...pageProps} />;
      </AppProviders>
    </>
  );
}
