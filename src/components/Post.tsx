import React from "react";
import { useTheme } from "../context/theme";
import { POST_AUTHOR } from "@/types/theme";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: POST_AUTHOR;
    published_at: string;
  };
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { theme } = useTheme();

  // Default components if theme doesn't provide them
  const defaults = {
    Title: ({ children }) => <h1>{children}</h1>,
    Content: ({ children }) => <div className="content">{children}</div>,
    Meta: ({ author, date }) => (
      <div className="meta">
        By {author?.name} on {date}
      </div>
    ),
  };

  // Merge default with theme-provided components
  const Slots = { ...defaults, ...theme.components.post };

  return (
    <article>
      <Slots.Title>{post.title}</Slots.Title>
      <Slots.Meta author={post.author} date={post.published_at} />
      <Slots.Content>{post.content}</Slots.Content>
    </article>
  );
};
