import React, { createContext, useContext, useState, useEffect } from "react";

interface Theme {
  name: string;
  components: { [key: string]: React.ComponentType<any> };
  styles: { [key: string]: React.CSSProperties };
}

interface ThemeContextValue {
  theme: Theme;
  switchTheme: (themeName: string) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue>(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(null);

  const loadTheme = async (themeName: string) => {
    // In a real-world scenario, this might come from an API or a dynamic import
    const themeModule = await import(`./themes/${themeName}`);
    return themeModule.default;
  };

  const switchTheme = async (themeName: string) => {
    const newTheme = await loadTheme(themeName);
    setTheme(newTheme);
    // You might also want to persist this choice to your backend
  };

  useEffect(() => {
    // Load the initial theme
    loadTheme("default").then(setTheme);
  }, []);

  if (!theme) return <div>Loading theme...</div>;

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Usage in a component
const ThemeSwitcher = () => {
  const { switchTheme } = useTheme();

  return (
    <select onChange={(e) => switchTheme(e.target.value)}>
      <option value="default">Default Theme</option>
      <option value="dark">Dark Theme</option>
      {/* other themes */}
    </select>
  );
};
