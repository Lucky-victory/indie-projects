import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};
export const theme = extendTheme({
  config,
  fonts: {
    heading: "var(--app-heading-font)",
    body: "var(--app-body-font)",
  },
  components: {
    Drawer: {
      sizes: {
        xs: { width: "200px" },
      },
    },
  },
});
