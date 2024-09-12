import { ReactNode } from "react";
import AppChakraProvider from "./chakra";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <AppChakraProvider>{children}</AppChakraProvider>
    </>
  );
}
