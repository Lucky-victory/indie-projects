import React from "react";
import { useTheme } from "../theme-context";

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: string;
    publishedDate: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { theme } = useTheme();

  // Default components if theme doesn't provide them
  const defaults = {
    Title: ({ children }) => <h1>{children}</h1>,
    Content: ({ children }) => <div className="content">{children}</div>,
    Meta: ({ author, date }) => (
      <div className="meta">
        By {author} on {date}
      </div>
    ),
  };

  // Merge default with theme-provided components
  const Slots = { ...defaults, ...theme.components.post };

  return (
    <article>
      <Slots.Title>{post.title}</Slots.Title>
      <Slots.Meta author={post.author} date={post.publishedDate} />
      <Slots.Content>{post.content}</Slots.Content>
    </article>
  );
};
