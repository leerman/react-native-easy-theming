import * as React from "react";
export type * from "./types";
import type { TTheme } from "./types";

type ThemeProviderProps = React.PropsWithChildren<{
  themes: Record<string, TTheme>;
  activeTheme: string;
  onChange: (name: string) => void;
}>;

type TContext = {
  theme: TTheme;
  change: (name: string) => void;
};

const context = React.createContext<TContext>(null as unknown as TContext);

export const ThemeProvider = ({
  activeTheme,
  onChange,
  themes,
  children,
}: ThemeProviderProps) => {
  return (
    <context.Provider value={{ theme: themes[activeTheme], change: onChange }}>
      {children}
    </context.Provider>
  );
};

export const useTheme = () => {
  const cxt = React.useContext(context);
  return cxt.theme;
};

export const useThemeChange = () => {
  const cxt = React.useContext(context);
  return cxt.change;
};
