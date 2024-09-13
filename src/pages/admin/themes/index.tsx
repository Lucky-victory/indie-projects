import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import fs from "fs";
import path from "path";
import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Text,
  VStack,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { THEME_CONFIG } from "@/types/theme";
import { Link } from "@chakra-ui/next-js";
import { useTheme } from "@/core/context/theme";

interface ServerSideProps {
  themeConfigs: THEME_CONFIG[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  const themesDir = path.join(process.cwd(), "src", "themes");
  const themeConfigs: THEME_CONFIG[] = [];

  try {
    const themeDirectories = fs
      .readdirSync(themesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const themeDir of themeDirectories) {
      const configPath = path.join(themesDir, themeDir, "config.json");

      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, "utf8");
        const config: THEME_CONFIG = JSON.parse(configContent);

        const assetDir = config.assetDirectory || "assets";
        const themeDirName = path.basename(themeDir);

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
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const imageBoxBg = useColorModeValue("gray.400", "gray.500");
  const { switchTheme, theme: activeTheme } = useTheme();

  if (error) {
    return <Text color="red.500">Error loading theme configs: {error}</Text>;
  }
  async function setTheme(theme: THEME_CONFIG) {
    await switchTheme(theme.slug);
  }
  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Theme Configurations
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 350px))" gap={6}>
        {themeConfigs.map((theme, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg={bgColor}
            transition="all 0.3s"
            display="flex"
            flexDirection="column"
            height="100%"
            _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
          >
            <Box bg={imageBoxBg}>
              <Image
                src={theme.screenshot}
                alt={`Screenshot of ${theme.name}`}
                objectFit="contain"
                w="100%"
                h="200px"
              />
            </Box>
            <VStack p={4} align="start" spacing={3} flex={1}>
              <Heading as="h2" size="md">
                {theme.name}
              </Heading>
              {theme.description && (
                <Text color={textColor} fontSize="sm">
                  {theme.description}
                </Text>
              )}
              <Box>
                {theme.authorName &&
                  (theme.authorWebsite ? (
                    <Text as={"span"} fontSize="xs">
                      By:{" "}
                      <Link color={"blue.500"} href={theme.authorWebsite}>
                        {theme.authorName}
                      </Link>
                    </Text>
                  ) : (
                    <Text as={"span"} fontSize="xs">
                      By:{" "}
                      <Text as={"span"} fontWeight={500}>
                        {theme.authorName}
                      </Text>
                    </Text>
                  ))}
              </Box>
              {theme.tags && (
                <Box>
                  {theme.tags.map((tag) => (
                    <Tag key={tag} mr={2} mb={2} size="sm">
                      {tag}
                    </Tag>
                  ))}
                </Box>
              )}
              <Box mt="auto" w={"full"}>
                <Button
                  onClick={() => {
                    setTheme(theme);
                  }}
                  colorScheme="blue"
                  size="sm"
                  width="full"
                  isDisabled={theme.slug === activeTheme.slug}
                >
                  {theme.slug === activeTheme.slug ? "Active" : "Select Theme"}
                </Button>
              </Box>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
