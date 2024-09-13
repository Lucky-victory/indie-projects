import { ComponentType, ReactNode } from "react";

export type THEME_COMPONENT_PROP<DATA_PROPS = Record<string, never>> = {
  children?: ReactNode;
} & DATA_PROPS;
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
  slug: string;
  name: string;
  components?: {
    post?: {
      Title?: ComponentType<THEME_COMPONENT_PROP<{ title: string }>>;
      Content?: ComponentType<THEME_COMPONENT_PROP<{ content: string }>>;
      Meta?: ComponentType<THEME_COMPONENT_PROP<POST_META>>;
    };
  };
}

export type NestedPropertyType<T, K extends keyof T> = NonNullable<T[K]>;
export type THEME_CONFIG = {
  /**
   * The name of the theme
   */
  name: string;
  slug: string;
  /**
   * Theme description
   */
  description?: string;
  /**
   * Theme tags
   */
  tags?: string[];
  /**
   * Author's name
   */
  authorName?: string;
  /**
   * Author's website
   */
  authorWebsite?: string;
  /**
   * Theme's assets directory (relative to theme's root directory e.g.`assets/`), this is where you add your theme assets
   */
  assetDirectory?: string;
  /**
   *  Theme's version
   */
  version?: string;
  /**
   * Screenshot to be displayed at the theme's listings, e.g `screenshot.png` (without the directory `assets/`)
   */
  screenshot: string;
};
