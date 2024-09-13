import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Image } from "@chakra-ui/react";
import fs from "fs";
import path from "path";

interface ThemeConfig {
  name: string;
  description?: string;
  screenshot: string;
  assetDirectory?: string;
  tags?: string[];
}

interface ServerSideProps {
  themeConfigs: ThemeConfig[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const themesDir = path.join(process.cwd(), "src", "themes");
  const themeConfigs: ThemeConfig[] = [];

  try {
    const themeDirectories = fs
      .readdirSync(themesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const themeDir of themeDirectories) {
      const configPath = path.join(themesDir, themeDir, "config.json");

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, "utf8");
        const config: ThemeConfig = JSON.parse(configContent);

        // Use the new URL structure for the screenshot
        const assetDir = config.assetDirectory || "assets";
        const themeDirName = path.basename(themeDir);
        console.log({ themeDirName, themeDir });

        config.screenshot = `/api/theme-assets/${themeDirName}/${assetDir}/${config.screenshot}`;

        themeConfigs.push(config);
      }
    }

    return {
      props: { themeConfigs },
    };
  } catch (error) {
    console.error("Error reading theme configs:", error);
    return {
      props: {
        themeConfigs: [],
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
    };
  }
};

export default function ThemesPage({
  themeConfigs,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (error) {
    return <div>Error loading theme configs: {error}</div>;
  }

  return (
    <div>
      <h1>Theme Configurations</h1>
      {themeConfigs.map((theme, index) => (
        <div key={index}>
          <h2>{theme.name}</h2>
          {theme.description && <p>{theme.description}</p>}
          <Image
            src={theme.screenshot}
            alt={`Screenshot of ${theme.name}`}
            style={{ maxWidth: "300px" }}
          />
          {theme.tags && <p>Tags: {theme.tags.join(", ")}</p>}
        </div>
      ))}
    </div>
  );
}
