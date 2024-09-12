import { Post } from "@/components/Post";
import { useTheme } from "@/context/theme";

export default function Home() {
  return (
    <>
      <Post
        post={{
          id: "1",
          title: "Hello World!",
          content: "This is my first blog post.",
          author: { name: "John Doe" },
          published_at: new Date().toLocaleDateString(),
        }}
      />
      <ThemeSwitcher />
    </>
  );
}
const ThemeSwitcher = () => {
  const { switchTheme } = useTheme();

  return (
    <select onChange={(e) => switchTheme(e.target.value)}>
      <option value="default">Default Theme</option>
      <option value="modern">modern Theme</option>
      {/* other themes */}
    </select>
  );
};
export { getServerSideProps } from "../providers/chakra";
