import { THEME } from "@/types/theme";

export const DefaultTheme: THEME = {
  name: "Default",
  components: {
    post: {
      Title: ({ children }) => <h1 className="default-title">{children}</h1>,
      Meta(props) {
        return <div className="post-meta">{props.children}</div>;
      },
      Content: ({ children }) => <div className="post-content">{children}</div>,
    },
  },
  // other theme configurations...
};
