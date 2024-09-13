import { THEME } from "@/types/theme";
import { Heading, Text } from "@chakra-ui/react";

export const DefaultTheme: THEME = {
  name: "default",
  components: {
    post: {
      Title: ({ title, children }) => (
        <Heading>
          {title} {children}
        </Heading>
      ),

      Content: ({ content }) => (
        <div>
          <Text>{content}</Text>
        </div>
      ),
    },
  },
  // other theme configurations...
};
export default DefaultTheme;
