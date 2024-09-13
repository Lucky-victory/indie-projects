import React from "react";
import { useTheme } from "../core/context/theme";
import { NestedPropertyType, POST_AUTHOR, THEME } from "@/types/theme";
import { HStack, Text } from "@chakra-ui/react";

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
  const defaults: NestedPropertyType<
    NonNullable<THEME["components"]>,
    "post"
  > = {
    Title: ({ children }) => <h1>{children}</h1>,
    Content: ({ children }) => <div className="content">{children}</div>,
    Meta: ({ author, published_at }) => (
      <HStack className="meta">
        <Text>
          By {author?.name} on {new Date(published_at).toDateString()}
        </Text>
        <span className="reading-time font-bold text-gray-600">
          {Math.floor(post.content.split(" ").length / 100)} min read time
        </span>
      </HStack>
    ),
  };

  // Merge default with theme-provided components
  const Slots = { ...defaults, ...theme.components?.post };

  return (
    <article>
      {Slots.Title && <Slots.Title title={post.title} />}
      {Slots.Meta && (
        <Slots.Meta author={post.author} published_at={post.published_at} />
      )}
      {Slots.Content && <Slots.Content content={post.content} />}
    </article>
  );
};
