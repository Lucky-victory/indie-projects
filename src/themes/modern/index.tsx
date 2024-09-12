import { THEME } from "@/types/theme";
import { Box, Heading, Text } from "@chakra-ui/react";

export const DefaultTheme: THEME = {
  name: "default",
  components: {
    post: {
      Title: ({ children }) => (
        <Heading className="default-title text-red-500">{children}</Heading>
      ),

      Content: ({ children, data }) => (
        <div className="post-content">
          {children}
          <Text color={"red"} p={4} bg={"gray.100"}>
            {data?.content}
          </Text>
        </div>
      ),
    },
  },
  // other theme configurations...
};
export default DefaultTheme;
