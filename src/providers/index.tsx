import { ReactNode } from "react";
import AppChakraProvider from "./chakra";
import { AppThemeProvider } from "@/context/theme";

export default function AppProviders({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string;
}) {
  return (
    <>
      <AppThemeProvider>
        <AppChakraProvider cookies={cookies}>{children}</AppChakraProvider>
      </AppThemeProvider>
    </>
  );
}
