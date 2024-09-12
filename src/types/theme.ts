import { ReactNode } from "react";

export interface THEME_COMPONENT_PROP<DATA_PROPS = undefined> {
  children?: ReactNode;
  data?: DATA_PROPS;
}
export interface POST_AUTHOR {
  name: string;
  avatar?: string;
}
export interface POST_META {
  author: POST_AUTHOR;
  published_at: string | Date;
}
// Theme interface for defining a theme with its components and their props
export interface THEME {
  name: string;
  components?: {
    post?: {
      Title?: (
        props: THEME_COMPONENT_PROP<{ title: string }>
      ) => ReactNode | Element;
      Content?: (
        props: THEME_COMPONENT_PROP<{ content: string }>
      ) => ReactNode | Element;
      Meta?: (props: THEME_COMPONENT_PROP<POST_META>) => ReactNode | Element;
    };
  };
}
