import { ReactNode } from "react";
import AppChakraProvider from "./chakra";

export default function AppProviders({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string;
}) {
  return (
    <>
      <AppChakraProvider cookies={cookies}>{children}</AppChakraProvider>
    </>
  );
}
