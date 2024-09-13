import { THEME } from "@/types/theme";
import { Heading, Text } from "@chakra-ui/react";

export const DefaultTheme: THEME = {
  name: "default",
  components: {
    post: {
      Title: ({ children }) => (
        <Heading className="default-title">{children}</Heading>
      ),

      Content: ({ children, content }) => (
        <div className="post-content">
          {children}
          <Text p={4} bg={"gray.100"}>
            {content}
          </Text>
        </div>
      ),
    },
  },
  // other theme configurations...
};
export default DefaultTheme;
