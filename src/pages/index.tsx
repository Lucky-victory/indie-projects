import { Post } from "@/components/Post";
import { useTheme } from "@/core/context/theme";

export default function Home() {
  return (
    <>
      <Post
        post={{
          id: "1",
          title: "Hello World!",
          content: `This is my first blog post. 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aut tenetur repellendus recusandae, adipisci dolores magni possimus aliquam consequatur, fuga earum deleniti, tempore veniam nam quasi accusamus beatae voluptates molestiae? Illum commodi pariatur vero magni ratione iusto tempore similique facilis quam suscipit? Atque harum a sint cupiditate quisquam ab at tempora maiores numquam, nulla, saepe excepturi reprehenderit repellat temporibus enim quis eos quod sit! Eum culpa, maxime repellat consequatur odit corporis dicta iusto debitis at dolorum commodi? Quibusdam voluptas magnam nisi officia architecto eos molestias quaerat illo. Ipsa ratione soluta eaque sed. Reprehenderit veritatis aliquam ex incidunt mollitia delectus facilis.
            `,
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
