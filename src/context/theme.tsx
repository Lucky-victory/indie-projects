import { THEME } from "@/types/theme";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextValue {
  theme: THEME;
  switchTheme: (themeName: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue>(null!);

export const useTheme = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<THEME>(null!);

  const loadTheme = async (themeName: string) => {
    // In a real-world scenario, this might come from an API or a dynamic import

    const themeModule = await import(`../themes/${themeName}`);
    return themeModule.default;
  };

  const switchTheme = async (themeName: string) => {
    const newTheme = await loadTheme(themeName);
    setTheme(newTheme);
    // TODO: Save the chosen theme to database
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", themeName);
    }
    // You might also want to persist this choice to your backend
  };

  useEffect(() => {
    let savedTheme: string | null;

    // TODO: retrieve the active theme from the database
    try {
      savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        loadTheme(savedTheme).then(setTheme);
      } else {
        loadTheme("default").then(setTheme);
      }
    } catch (error) {
      // Handle error if localStorage is unavailable
    }
  }, []);

  if (!theme) return <div>Loading theme...</div>;

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
