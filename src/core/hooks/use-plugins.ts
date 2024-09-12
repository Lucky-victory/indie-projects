import { useState, useEffect } from "react";

type PLUGIN_CALLBACK = <V, R = V>(value: V) => R;

const plugins: Record<string, PLUGIN_CALLBACK[]> = {
  "post-content": [],
};

export const registerPlugin = (hookName: string, callback: PLUGIN_CALLBACK) => {
  plugins[hookName as keyof typeof plugins].push(callback);
};

export const usePlugins = <VAL = unknown>(
  hookName: string,
  defaultValue: VAL
) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let result = defaultValue;
    for (const plugin of plugins[hookName]) {
      result = plugin(result);
    }
    setValue(result);
  }, [hookName, defaultValue]);

  return value;
};
