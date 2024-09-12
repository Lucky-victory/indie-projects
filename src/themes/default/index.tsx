import { THEME } from "@/types/theme";

export const DefaultTheme: THEME = {
  name: "default",
  components: {
    post: {
      Title: ({ children }) => (
        <h1 className="default-title text-red-500">{children}</h1>
      ),

      Content: ({ children }) => <div className="post-content">{children}</div>,
    },
  },
  // other theme configurations...
};
export default DefaultTheme;
